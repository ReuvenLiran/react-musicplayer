import { connect } from 'react-redux'
import { setActiveSong } from '../actions/songs'
import React, { Component, PropTypes } from 'react'
import MusicPlayer from '../components/MusicPlayer'
import Player from '../utils/Player'
import shuffle from 'shuffle-array'
import { YOUTUBE_CONSTS } from '../utils/constants'
import LinearProgress from '../components/LinearProgress'
import Utils from '../utils/utils'
var youtubePlayer
var player

const mapStateToProps = (state) => {
  return {
    loadYT: state.songs.loadYT,
    activeSong: state.songs.activeSong
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveSong: (activeSong) => {
      dispatch(setActiveSong(activeSong))
    }
  }
}

class MusicPlayerContainer extends Component {

  constructor (props) {
    super(props)
    this.songs = this.props.songs
    this.repeat = false
    this.progress = 0
    this.current = 0
    this.random = false
    this.type = 'LOCAL'
    this.song = this.props.activeSong
    this.song.artists = Utils.alignArtists(this.song.artists)
    this.isPlay = false

    this.state = {
      type: null,
      progress: 0,
      isPlay: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.song = nextProps.activeSong
    this.song.artists = Utils.alignArtists(this.song.artists)
    if (this.song !== undefined) {
      if (this.song.artists === 'Youtube') {
        player.setSrc(this.song.id)
      } else {
        player = new Player(this.refs.child.refs.player, 'LOCAL', this.song.file)

        player.addEventListener('timeupdate', this.updateProgress)
        player.addEventListener('ended', this.end)
        player.addEventListener('error', this.next)

        this.type = 'LOCAL'
        player.setSrc(this.song.file)
      }
      this.setState({ progress : 0 })
    }
  }

  componentDidMount = () => {
    this.song = this.props.activeSong

    if (this.song !== null) {
      if (this.song.artists !== YOUTUBE_CONSTS.YOUTUBE) {
        player = new Player(this.refs.child.refs.player, 'LOCAL', this.props.activeSong.file)

        player.addEventListener('timeupdate', this.updateProgress)
        player.addEventListener('ended', this.end)
        player.addEventListener('error', this.next)
        this.type = 'LOCAL'
      } else if (this.song.artists === YOUTUBE_CONSTS.YOUTUBE) {
        youtubePlayer = new this.props.loadYT.Player(this.refs.child.youtubePlayerAnchor, {
          height: 0,
          width: 0,
          videoId: this.song.id,
          playerVars: {     // Clean up youtube iframe for better performance
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            showinfo: 0
          },
          events: {
            onReady: this.onReady,
            onStateChange: this.onPlayerStateChange
          }
        })
        this.type = YOUTUBE_CONSTS.YOUTUBE
        player = new Player(youtubePlayer, YOUTUBE_CONSTS.YOUTUBE, this.song.src)
      }
    }
  }

  onReady = (e) => {
    console.log('ready')
  }
  onPlayerStateChange = (e) => {
    this.state.isPlay ? player.play() : player.pause()

    if (e.data === 0) {
      this.end()
    }

    if (e.data !== 1 && !this.state.isPlay && this.interval) {
      clearInterval(this.interval)
      delete this.interval
    } else if (e.data === 1 & this.state.isPlay && !this.interval) {
      this.interval = setInterval(this.updateProgress, 1000)
    }
  }

  updateProgress = () => {
    let duration = player.getDuration()
    let currentTime = player.getCurrentTime()
    this.progress = (currentTime * 100) / duration
    this.setState({ progress: this.progress })
    console.log('updateProgress')
  }

  play = () => {
    player.play()
    this.setState({ isPlay: true })
  }

  pause = () => {
    player.pause()
    this.setState({ isPlay: false })
  }

  next = () => {
    var total = this.songs.length
    this.current = (this.current < total - 1) ? this.current + 1 : 0
    var active = this.songs[this.current]
    this.props.setActiveSong(active)
  }

  previous = () => {
    var total = this.songs.length
    this.current = (this.current > 0) ? this.current - 1 : total - 1
    var active = this.songs[this.current]
    this.props.setActiveSong(active)
  }

  setSrc (song) {
    if (this.state.type === 'Youtube') {
      player.setSrc(song.id)
    } else {
      player.setSrc(song.file)
    }
  }

  mute = () => {
    player.isMuted() ? player.unMute() : player.mute()
    return player.isMuted()
  }

  end = () => {
    this.repeat ? this.play() : this.next()
  }

  toggleRepeat = () => {
    this.repeat = !this.repeat
    return this.repeat
  }

  setProgress = (e) => {
    let target = e.target.parentNode // e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target
    let width = target.clientWidth
    let rect = target.getBoundingClientRect()
    let offsetX = e.clientX - rect.left

    let duration = player.getDuration()
    let currentTime = (duration * offsetX) / width
    let progress = (currentTime * 100) / duration

    player.setCurrentTime(currentTime)
    this.setState({ progress: progress })
    this.play()
  }

  randomize = () => {
    this.random ? this.songs = shuffle(this.songs.slice()) : this.songs = this.props.songs
    this.random = !this.random
    return this.random
  }

  render () {
    return (

      <footer className='player-container' style={{ 'height' : '90px !important', 'width': '100%' }}>
        <div className='progress-bar' onClick={this.setProgress}>
          <LinearProgress progress={this.state.progress} />
        </div>

        <MusicPlayer ref='child' play={this.play} pause={this.pause}
          next={this.next} previous={this.previous} mute={this.mute} repeat={this.toggleRepeat}
          random={this.randomize} song={this.song} isPlay={this.state.isPlay} />
      </footer>
    )
  }
}

MusicPlayerContainer.propTypes = {
  song: PropTypes.object.isRequired,
  songs: PropTypes.array.isRequired,
  activeSong: PropTypes.object.isRequired,
  loadYT: PropTypes.object.isRequired,
  setActiveSong: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerContainer)
