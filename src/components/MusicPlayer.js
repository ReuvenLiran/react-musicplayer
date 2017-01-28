import '../styles/MusicPlayer.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { YOUTUBE_CONSTS } from '../utils/constants'

class ReactMusicPlayerFloat extends Component {

  constructor (props) {
    super(props)
    this.state = {
      random: false,
      repeat: false,
      mute: false,
      play: false,
      btnTypeMute: 'volume_off',
      btnTypePlay: 'play_arrow'
    }
  }

  // Block re-render when song wasn't changed
  shouldComponentUpdate (nextProps, nextState) {
    if ((this.props.song !== null &&
         this.props.song !== nextProps.song) ||
        (this.props.isPlay !== nextProps.isPlay) ||
         this.state !== nextState) {
      return true
    } else {
      return false
    }
  }

  play = () => {
   // this.setState({ play: true, btnTypePlay : 'pause' })
    this.props.play()
  }

  pause = () => {
   // this.setState({ play: false, btnTypePlay : 'play_arrow' })
    this.props.pause()
  }

  toggle = () => {
    this.props.isPlay ? this.pause() : this.play()
  }

  end = () => {
    (this.state.repeat) ? this.play() : this.next()
  }

  next = () => {
    this.props.next()
    this.play()
  }

  previous = () => {
    this.props.previous()
    this.play()
  }

  randomize = () => {
    this.setState({ random : this.props.random() })
  }

  repeat = () => {
    let repeat = this.props.repeat()
    this.setState({ repeat: repeat })
  }

  toggleMute = () => {
    let mute = this.props.mute()
    this.setState({ btnTypeMute: (mute ? 'volume_off' : 'volume_up') })
  }

  setSource (type, src) {
    if (type !== YOUTUBE_CONSTS.YOUTUBE) {
      return this.renderSource()
    }
  }

  renderYoutubeIframe () {
    return (
      <div ref={(r) => { this.youtubePlayerAnchor = r }} />
    )
  }
  renderSource (src) {
    return <audio autoPlay={this.state.play} preload='auto' ref='player' />
  }
  render () {
    const { song } = this.props
    let generalClass = 'material-icons vertical-align player-btn medium'
    let volumeClass = classnames(generalClass)
    let repeatClass = classnames(generalClass, { 'active': this.state.repeat })
    let randomClass = classnames(generalClass, { 'active': this.state.random })
    let skipClass = classnames(generalClass, { 'skip': true })
    return (
      <div>
        {this.renderYoutubeIframe()}
        {this.setSource('LOCAL')}

        <div className='player-sub-container'>
          <img className='player-cover' src={song.artists === 'Youtube'
           ? song.albumCover : 'data:image/png;base64,' + song.albumCover} />

          <div className='artist-container'>
            <div className='artist-info'>
              <span className='artist-song-name'>{song.title}</span>
              <span className='artist-name'>{song.artists}</span>
            </div>
          </div>

          <div className='player-buttons' >
            <i className={skipClass} onClick={this.previous}>skip_previous</i>
            <i className='material-icons vertical-align player-btn play'
              onClick={this.toggle}>{!this.props.isPlay ? 'play_arrow' : 'pause' }</i>
            <i className={skipClass} onClick={this.next}>skip_next</i>
          </div>

          <div className='player-options hidden-xs-down'>
            <i className={repeatClass} onClick={this.repeat}>loop</i>
            <i className={randomClass} onClick={this.randomize}>shuffle</i>
            <i className={volumeClass}
              onClick={this.toggleMute}> {this.state.btnTypeMute}</i>
          </div>
        </div>
      </div>

    )
  }
}

ReactMusicPlayerFloat.propTypes = {
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  mute: PropTypes.func.isRequired,
  repeat: PropTypes.func.isRequired,
  random: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  isPlay: PropTypes.bool.isRequired
}

export default ReactMusicPlayerFloat
