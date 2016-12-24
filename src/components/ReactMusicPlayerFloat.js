import '../styles/ReactMusicPlayerFloat.scss'
import * as constants from '../constants'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import shuffle from 'shuffle-array'
import LinearProgress from 'material-ui/LinearProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { DEEP_ORANGE } from '../constants'

class ReactMusicPlayerFloat extends Component {

  state = {
    activeSong: this.props.activeSong,
    active: this.props.activeSong,
    current: 0,
    progress: 0,
    random: false,
    repeat: false,
    mute: false,
    play: this.props.autoplay || false,
    songs: this.props.songs,
    srcPlay: 'icons/ic_play_arrow_white_18dp.png',
    srcMute: 'icons/ic_volume_off_black_18dp.png',
    srcShuffle: 'icons/ic_shuffle_black_18dp.png',
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
    this.refs.player.play()
    this.setState({ srcPlay : 'icons/ic_pause_white_18dp.png' })
  }

  pause = () => {
    this.setState({ play: false })
    this.refs.player.pause()
  }

  toggle = () => {
    this.state.play ? this.pause() : this.play()
    this.state.play ?
    this.setState({ srcPlay : 'icons/ic_play_arrow_white_18dp.png' })
    : this.setState({ srcPlay : 'icons/ic_pause_white_18dp.png' })
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
        // this.refs.player.src = active.url;
    this.refs.player.src = active.file
    this.play()
  }

  previous = () => {
    var total = this.state.songs.length
    var current = (this.state.current > 0) ? this.state.current - 1 : total - 1
    var active = this.state.songs[current]

    this.setState({ current: current, active: active, progress: 0 })
    this.props.setActiveSong(active)
        // this.refs.player.src = active.url;
    this.refs.player.src = active.file
    this.play()
  }

  randomize = () => {
    var s = shuffle(this.state.songs.slice())

    this.setState({ songs: (!this.state.random) ? s : this.state.songs, random: !this.state.random })
    this.setState({ srcShuffle: (!this.state.random) 
      ? '/icons/ic_shuffle_black_18dp.png'
      : '/icons/ic_shuffle_active_black_18dp.png' }) 
 }

  repeat = () => {
    this.setState({ repeat: !this.state.repeat })
  }

  toggleMute = () => {
    let mute = this.state.mute

    this.setState({ mute: !this.state.mute })
    this.refs.player.volume = (mute) ? 1 : 0

    let srcMute = (mute) ? '/icons/ic_volume_off_black_18dp.png' 
    : '/icons/ic_volume_up_black_18dp.png'
    this.setState({ srcMute: srcMute })

  }

  setSong = () => {
    if (this.props.activeSong !== this.state.activeSong) {
      this.setState({ active: this.props.activeSong })
      this.setState({ activeSong: this.props.activeSong })
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
    const { activeSong, play, progress } = this.state

    // let coverClass = classnames('player-cover', { 'no-height': activeSong.cover })
    let playPauseClass = classnames('fa', { 'fa-pause': play }, { 'fa-play': !play })
    let volumeClass = classnames('fa', { 'fa-volume-up': !this.state.mute }, { 'fa-volume-off': this.state.mute })
    let volumeClass1 = classnames('player-btn medium volume', { 'active': this.state.mute })

    let repeatClass = classnames('player-btn medium repeat', { 'active': this.state.repeat })
    let randomClass = classnames('player-btn medium random', { 'active': this.state.random })

    return (

      <footer className='player-container' style={{ 'height' : '90px !important', 'width': '100%' }}>

        <audio src={constants.ROOT_URL + '/' + activeSong.file}
          autoPlay={this.state.play} preload='auto' ref='player' />

        <MuiThemeProvider>

          <div style={{ 'zIndex' : '2', 'top' : '0', 'left' : '-2%', 'height' : '6px', 'width': '100%' }} onClick={this.setProgress}>
            <LinearProgress color={DEEP_ORANGE} mode='determinate' value={progress} />
          </div>
        </MuiThemeProvider>
        <div style={{ 'display' : 'flex', 'height' : '100%' }}>

          <div className='player-cover'
            style={{ 'height' : '100%', 'width' : '86px', 'backgroundImage': 'url("data:image/png;base64,' + activeSong.cover + '")' }} />

          <div style={{ 'display' : 'flex', 'flex' : '1', 'width' : '37vw' }} >
            <div className='artist-info'>
              <h1 style={{ 'fontSize' : '12px' }} className='artist-song-name'>{activeSong.track_name}</h1>
              <h1 style={{ 'fontSize' : '10px' }} className='artist-name'>{this.alignArtists(activeSong.artists)}</h1>
            </div>
          </div>

          <div className='dv1' style={{ 'width' : '30%', 'display' : 'inline-block' }}>

            <input type='image' style={{ 'transform' : 'translate(0, -35%)', 'marginRight' : '10px', 'width' : '20px' }} onClick={this.previous}
              src='icons/ic_skip_previous_black_18dp.png' />
             <span style={{'transform' : 'translate(0, -55%)'}}>
           <div className='round-button' style={{ 'marginRight' : '10px' }} onClick={this.toggle}>
              <div className='round-button-circle'>
                <img style={{ 'width' : 'inherit' }} className='round-button-img'
                  src={this.state.srcPlay} /></div></div>
            </span>

            <input type='image' style={{ 'transform' : 'translate(0, -35%)', 'marginRight' : '10px', 'width' : '20px' }} onClick={this.next}
              src='icons/ic_skip_next_black_18dp.png' />

          </div>

           <div className='dv1 hidden-xs-down' style={{ 'width' : '20%', 'display' : 'inline-block' }}>
            <input className='vertical-align' 
            type='image' style={{ 'marginLeft' : '20%', 'marginRight' : '10%', 'width' : '20px' }} onClick={this.repeat}
              src='icons/ic_loop_black_18dp.png' />
            <input className='vertical-align' type='image' style={{ 'marginRight' : '10%', 'width' : '20px' }} onClick={this.randomize}
              src={this.state.srcShuffle} />
            <input className='vertical-align' type='image' style={{ 'marginRight' : '10%', 'width' : '20px' }} onClick={this.toggleMute}
              src={this.state.srcMute} />

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
