import '../styles/ReactMusicPlayerFloat.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import shuffle from 'shuffle-array'
import LinearProgress from 'material-ui/LinearProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BASE_COLOR1, YOUTUBE_CONSTS } from '../constants'
import Player from '../Player'

var youtubePlayer
var player
var loadYT1
class ReactMusicPlayerFloat extends Component {

  constructor (props) {
    super(props)

    this.song = this.props.song
    let metaData = { }

    this.loadYT
    this.YT
    metaData.artists = this.alignArtists(this.song.artists)
    metaData.title = this.song.title
    if (metaData.artists === 'Youtube') {
      metaData.thumbnail = this.song.thumbnail
      this.src = this.song.id
      metaData.type = YOUTUBE_CONSTS.YOUTUBE
    } else {
      metaData.thumbnail = 'data:image/png;base64,' + this.song.thumbnail
      this.src = this.song.file
      metaData.type = 'LOCAL'
    }

    this.state = {
      player: {},
      metaData: metaData,
      activeSong: this.props.activeSong,
      active: this.props.activeSong,
      current: 0,
      progress: 0,
      random: false,
      repeat: false,
      mute: false,
      play: this.props.autoplay || false,
      songs: this.props.songs,
      btnTypeMute: 'volume_off',
      btnTypePlay: 'play_arrow'
    }
  }

  componentDidMount = () => {
    if (!loadYT1) {
      this.loadYoutubeAPI()
    }

    if (this.state.metaData.type !== YOUTUBE_CONSTS.YOUTUBE) {
      player = new Player(this.refs.player, this.state.metaData.type, this.src)

      player.addEventListener('timeupdate', this.updateProgress)
      player.addEventListener('ended', this.end)
      player.addEventListener('error', this.next)
    } else if (this.state.metaData.type === YOUTUBE_CONSTS.YOUTUBE) {

      loadYT1.then((YT) => {
        youtubePlayer = new YT.Player(this.youtubePlayerAnchor, {
          height: 0,
          width: 0,
          videoId: this.src,
          events: {
            onReady: this.onReady,
            onStateChange: this.onPlayerStateChange
          }
        })
        player = new Player(youtubePlayer, YOUTUBE_CONSTS.YOUTUBE, this.src)
      })
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
    console.log('e', e.data)

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

  updateProgress = () => {
    let duration = player.getDuration()
    let currentTime = player.getCurrentTime()
    let progress = (currentTime * 100) / duration
    this.setState({ progress: progress })
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

  componentWillUnmount = () => {
    if (player.type !== YOUTUBE_CONSTS.YOUTUBE) {
      player.removeEventListener('timeupdate', this.updateProgress)
      player.removeEventListener('ended', this.end)
      player.removeEventListener('error', this.next)
    }
  }

  play = () => {
    this.setState({ play: true, btnTypePlay : 'pause' })
    player.play()
  }

  pause = () => {
    this.setState({ play: false })
    this.setState({ btnTypePlay : 'play_arrow' })
    player.pause()
  }

  toggle = () => {
    this.state.play ? this.pause() : this.play()
  }

  end = () => {
    (this.state.repeat) ? this.play() : this.next()
  }

  next = () => {
    var total = this.state.songs.length
    var current = (this.state.repeat) ? this.state.current
        : (this.state.current < total - 1) ? this.state.current + 1 : 0
    var active = this.state.songs[current]

    this.setState({ current: current, active: active, progress: 0 })
    this.props.setActiveSong(active)
    player.setSrc(active.id || active.file)
    this.play()
  }

  previous = () => {
    var total = this.state.songs.length
    var current = (this.state.current > 0) ? this.state.current - 1 : total - 1
    var active = this.state.songs[current]

    this.setState({ current: current, active: active, progress: 0 })
    this.props.setActiveSong(active)
    player.setSrc(active.id || active.file)
    this.play()
  }

  randomize = () => {
    var s = shuffle(this.state.songs.slice())
    this.setState({ songs: (!this.state.random) ? s : this.state.songs, random: !this.state.random })
  }

  repeat = () => {
    this.setState({ repeat: !this.state.repeat })
  }

  toggleMute = () => {
    let mute = this.state.mute

    this.setState({ mute: !this.state.mute })
    mute ? player.unMute() : player.mute()
    this.setState({ btnTypeMute: (mute ? 'volume_off' : 'volume_up') })
  }

  setMetaData (song) {
    let metaData = {}
    metaData.artists = this.alignArtists(song.artists)
    metaData.title = song.title

    if (metaData.artists === 'Youtube') {
      metaData.thumbnail = song.thumbnail
      metaData.type = YOUTUBE_CONSTS.YOUTUBE
      this.src = song.id
    } else {
      metaData.type = 'LOCAL'
      metaData.thumbnail = 'data:image/png;base64,' + song.thumbnail
      this.src = song.file
    }
    console.log(player)
    player.setSrc(this.src)
    this.setState({ metaData: metaData })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.activeSong !== nextProps.activeSong) {
      this.setState({ active: nextProps.activeSong })
      this.setState({ activeSong: nextProps.activeSong })
      this.setMetaData(nextProps.activeSong)
    }
  }
  alignArtists (artists) {
    var strArtists = ''
    if (artists !== undefined) {
      artists.map((artist) => {
        strArtists = strArtists.concat(artist).concat(', ')
      })
    }
    return strArtists.slice(0, strArtists.length - 2)
  }

  setSource (type) {
    if (type !== YOUTUBE_CONSTS.YOUTUBE) {
      return this.renderSource()
    }
  }

  renderYoutubeIframe () {
    return (
      <div ref={(r) => { this.youtubePlayerAnchor = r }} />
    )
  }
  renderSource () {
    return <audio src={this.state.metaData.src} autoPlay={this.state.play} preload='auto' ref='player' />
  }
  render () {
    // this.setSong()
    const { progress } = this.state

    let generalClass = 'material-icons vertical-align player-btn medium'
    let volumeClass = classnames(generalClass)
    let repeatClass = classnames(generalClass, { 'active': this.state.repeat })
    let randomClass = classnames(generalClass, { 'active': this.state.random })
    let skipClass = classnames(generalClass, { 'skip': true })

    return (

      <footer className='player-container' style={{ 'height' : '90px !important', 'width': '100%' }}>

        {this.renderYoutubeIframe()}
        {this.setSource(this.state.metaData.type)}

        <MuiThemeProvider>
          <div className='progress-bar' onClick={this.setProgress}>
            <LinearProgress color={BASE_COLOR1} mode='determinate' value={progress} />
          </div>
        </MuiThemeProvider>

        <div className='player-sub-container'>

          <img className='player-cover' src={this.state.metaData.thumbnail} />

          <div className='artist-container'>
            <div className='artist-info'>
              <span className='artist-song-name'>{this.state.metaData.title}</span>
              <span className='artist-name'>{this.state.metaData.artists}</span>
            </div>
          </div>

          <div className='player-buttons' >

            <i className={skipClass} onClick={this.previous}>skip_previous</i>
            <i className='material-icons vertical-align player-btn play'
              onClick={this.toggle}>{this.state.btnTypePlay}</i>
            <i className={skipClass} onClick={this.next}>skip_next</i>

          </div>

          <div className='player-options hidden-xs-down'>

            <i className={repeatClass} onClick={this.repeat}>loop</i>
            <i className={randomClass} onClick={this.randomize}>shuffle</i>
            <i className={volumeClass}
              onClick={this.toggleMute}> {this.state.btnTypeMute}</i>
          </div>
        </div>
      </footer>

    )
  }
}

ReactMusicPlayerFloat.propTypes = {
  autoplay: PropTypes.bool,
  songs: PropTypes.array.isRequired,
  setActiveSong: PropTypes.func.isRequired,
  activeSong: PropTypes.object
}

export default ReactMusicPlayerFloat
