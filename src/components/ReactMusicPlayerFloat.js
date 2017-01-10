import '../styles/ReactMusicPlayerFloat.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import shuffle from 'shuffle-array'
import LinearProgress from 'material-ui/LinearProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ROOT_URL, BASE_COLOR1 } from '../constants'

class ReactMusicPlayerFloat extends Component {

  constructor (props) {
    super(props)
    this.song = this.props.song
    let metaData = { }

    metaData.artists = this.alignArtists(this.song.artists)
    metaData.title = this.song.title

    if (metaData.artists[0] === 'Youtube') {
     // metaData.duration = this.song.duration
      metaData.thumbnail = this.song.thumbnail
    } else {
      // metaData.duration = this.secondsToMinutes(this.song.duration)
      metaData.thumbnail = 'data:image/png;base64,' + this.song.thumbnail
    }
    this.state = {
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
    let playerElement = this.refs.player
    playerElement.addEventListener('timeupdate', this.updateProgress)
    playerElement.addEventListener('ended', this.end)
    playerElement.addEventListener('error', this.next)
  }

  componentWillUnmount = () => {
    let playerElement = this.refs.player
    playerElement.removeEventListener('timeupdate', this.updateProgress)
    playerElement.removeEventListener('ended', this.end)
    playerElement.removeEventListener('error', this.next)
  }

  setProgress = (e) => {
    let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target
    let width = target.clientWidth
    let rect = target.getBoundingClientRect()
    let offsetX = e.clientX - rect.left
    let duration = this.refs.player.duration
    let currentTime = (duration * offsetX) / width
    let progress = (currentTime * 100) / duration

    this.refs.player.currentTime = currentTime
    this.setState({ progress: progress })
    this.play()
  }

  updateProgress = () => {
    let duration = this.refs.player.duration
    let currentTime = this.refs.player.currentTime
    let progress = (currentTime * 100) / duration

    this.setState({ progress: progress })
  }

  play = () => {
    this.setState({ play: true })
    this.setState({ btnTypePlay : 'pause' })
    this.refs.player.play()
  }

  pause = () => {
    this.setState({ play: false })
    this.setState({ btnTypePlay : 'play_arrow' })
    this.refs.player.pause()
  }

  toggle = () => {
    this.state.play ? this.pause() : this.play()
  }

  end = () => {
    (this.state.repeat) ? this.play() : this.setState({ play: false })
  }

  next = () => {
    var total = this.state.songs.length
    var current = (this.state.repeat) ? this.state.current
        : (this.state.current < total - 1) ? this.state.current + 1 : 0
    var active = this.state.songs[current]

    this.setState({ current: current, active: active, progress: 0 })
    this.props.setActiveSong(active)
    this.refs.player.src = active.file
    this.play()
  }

  previous = () => {
    var total = this.state.songs.length
    var current = (this.state.current > 0) ? this.state.current - 1 : total - 1
    var active = this.state.songs[current]

    this.setState({ current: current, active: active, progress: 0 })
    this.props.setActiveSong(active)
    this.refs.player.src = active.file
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
    this.refs.player.volume = (mute) ? 1 : 0
    this.setState({ btnTypeMute: (mute ? 'volume_off' : 'volume_up') })
  }

  setSong = () => {
    if (this.props.activeSong !== this.state.activeSong) {
      this.setState({ active: this.props.activeSong })
      this.setState({ activeSong: this.props.activeSong })

      let metaData = {}
      metaData.artists = this.alignArtists(this.props.activeSong.artists)
      metaData.title = this.props.activeSong.title

      if (metaData.artists[0] === 'Youtube') {
        metaData.thumbnail = this.props.activeSong.thumbnail
      } else {
        metaData.thumbnail = 'data:image/png;base64,' + this.props.activeSong.thumbnail
      }
      this.setState({ metaData: metaData })
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

  render () {
    this.setSong()
    const { activeSong, progress } = this.state

    let generalClass = 'material-icons vertical-align player-btn medium'
    let volumeClass = classnames(generalClass)
    let repeatClass = classnames(generalClass, { 'active': this.state.repeat })
    let randomClass = classnames(generalClass, { 'active': this.state.random })
    let skipClass = classnames(generalClass, { 'skip': true })

    return (

      <footer className='player-container' style={{ 'height' : '90px !important', 'width': '100%' }}>

        <audio src={ROOT_URL + '/' + activeSong.file}
          autoPlay={this.state.play} preload='auto' ref='player' />

        <MuiThemeProvider>

          <div style={{ 'zIndex' : '2', 'top' : '0', 'left' : '-2%', 'height' : '6px', 'width': '100%' }}
            onClick={this.setProgress}>
            <LinearProgress color={BASE_COLOR1} mode='determinate' value={progress} />
          </div>
        </MuiThemeProvider>
        <div style={{ 'display' : 'flex', 'height' : '100%' }}>

          <img className='player-cover' style={{
            'height' : '75px',
            'width' : '86px' }}
            src={this.state.metaData.thumbnail} />

          <div style={{ 'display' : 'flex', 'flex' : '1', 'width' : '33vw' }} >
            <div className='artist-info'>
              <h1 style={{ 'fontSize' : '12px' }} className='artist-song-name'>{this.state.metaData.title}</h1>
              <h1 style={{ 'fontSize' : '10px' }} className='artist-name'>{this.state.metaData.artists}</h1>
            </div>
          </div>

          <div style={{ 'display' : 'inline-block', 'verticalAlign' : 'top', 'width' : '33vw' }} >

            <i className={skipClass} onClick={this.previous}>skip_previous</i>

            <i className='material-icons vertical-align player-btn play'
              onClick={this.toggle}>{this.state.btnTypePlay}</i>

            <i className={skipClass} onClick={this.next}>skip_next</i>

          </div>

          <div className='dv1 hidden-xs-down' style={{ 'width' : '20%', 'display' : 'inline-block' }}>

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
