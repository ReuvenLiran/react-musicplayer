import { connect } from 'react-redux'
import { setActiveSong } from '../actions/songs'
import React, { Component, PropTypes } from 'react'
import ReactMusicPlayerFloat from '../components/MusicPlayer'
import Player from '../Player'
import shuffle from 'shuffle-array'
import { BASE_COLOR1, YOUTUBE_CONSTS } from '../constants'
import LinearProgress from 'material-ui/LinearProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../styles/ReactMusicPlayerFloat.scss'

var youtubePlayer
var player
var loadYT1

const mapStateToProps = (state) => {
  return {
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
    // this.props.setActiveSong(this.props.songs[0])
    this.repeat = false
    this.progress = 0
    this.current = 0
    this.random = false
    this.type = 'LOCAL'
    this.song = this.props.activeSong
    this.song.artists = this.alignArtists(this.song.artists)

    this.state = {
      type: null,
      current: 0,
      progress: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', this.song)
    console.log('componentWillReceiveProps', this.song.artists.constructor == Array)
    this.song = nextProps.activeSong

    this.song.artists = this.alignArtists(this.song.artists)

    if (this.song !== undefined) {

      if (this.song.artists === 'Youtube') {
        player.setSrc(this.song.id)
        player.play()
      } else {
      
        player = new Player(this.refs.child.refs.player, 'LOCAL', this.song.file)

        player.addEventListener('timeupdate', this.updateProgress)
        player.addEventListener('ended', this.end)
        player.addEventListener('error', this.next)

        this.type = 'LOCAL'

        player.setSrc(this.song.file)
      }
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount', this.props.activeSong)

    this.song = this.props.activeSong
    if (!loadYT1) {
      this.loadYoutubeAPI()
    }

    if (this.song !== null) {
      if (this.song.artists !== YOUTUBE_CONSTS.YOUTUBE) {
        player = new Player(this.refs.child.refs.player, 'LOCAL', this.props.activeSong.file)

        player.addEventListener('timeupdate', this.updateProgress)
        player.addEventListener('ended', this.end)
        player.addEventListener('error', this.next)
        this.type = 'LOCAL'
      } else if (this.song.artists === YOUTUBE_CONSTS.YOUTUBE) {
        loadYT1.then((YT) => {
          youtubePlayer = new YT.Player(this.refs.child.youtubePlayerAnchor, {
            height: 0,
            width: 0,
            videoId: this.song.id,
            playerVars: {
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
        })
      }
    }
  }
  loadYoutubeAPI = () => {
    loadYT1 = new Promise((resolve) => {
      console.log('loadYT Loading...')
      const tag = document.createElement('script')
      tag.src = YOUTUBE_CONSTS.API_URL
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      window.onYouTubeIframeAPIReady = () => { resolve(window.YT); console.log('YT') }
    })
  }

  onReady = (e) => {
    console.log('onReady')
    player.pause()
  }
  onPlayerStateChange = (e) => {
    if (e.data === 0) {
      this.end()
    }

    if (e.data !== 1 && this.interval) {
      clearInterval(this.interval)
      delete this.interval
    } else {
      this.interval = setInterval(this.updateProgress, 1000)
    }
  }

  alignArtists = (artists) => {
    if (artists.constructor !== Array) {
      return artists
    }
    var strArtists = ''
    if (artists !== undefined) {
      artists.map((artist) => {
        strArtists = strArtists.concat(artist).concat(', ')
      })
    }
    return strArtists.slice(0, strArtists.length - 2)
  }

  updateProgress = () => {
    let duration = player.getDuration()
    let currentTime = player.getCurrentTime()
    this.progress = (currentTime * 100) / duration
    this.setState({ progress: this.progress })
  }

  play = () => {
    player.play()
  }

  pause = () => {
    player.pause()
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
        <MuiThemeProvider>
          <div className='progress-bar' onClick={this.setProgress}>
            <LinearProgress color={BASE_COLOR1} mode='determinate' value={this.state.progress} />
          </div>
        </MuiThemeProvider>

        <ReactMusicPlayerFloat ref='child' play={this.play} pause={this.pause}
          next={this.next} previous={this.previous} mute={this.mute} repeat={this.toggleRepeat}
          random={this.randomize} song={this.song} />
      </footer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerContainer)
