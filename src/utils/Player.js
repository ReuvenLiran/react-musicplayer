import { ROOT_URL, YOUTUBE_CONSTS } from './constants'

export default class Player {

  constructor (player, type, src) {
    this.type = type
    this.player = player
    if (type !== YOUTUBE_CONSTS.YOUTUBE) {
      this.setSrc(src)
    }
  }

  setSrc = (src) => {
    switch (this.type) {
      case YOUTUBE_CONSTS.YOUTUBE:
        this.player.loadVideoById(src)
        break
      default:
        this.player.src = ROOT_URL + '/' + src
    }
  }
  play = () => {
    switch (this.type) {
      case YOUTUBE_CONSTS.YOUTUBE:
        this.player.playVideo()
        break
      default:
        this.player.play()
    }
  }

  pause = () => {
    switch (this.type) {
      case YOUTUBE_CONSTS.YOUTUBE:
        this.player.pauseVideo()
        break
      default:
        this.player.pause()
    }
  }

  mute = () => {
    switch (this.type) {
      case YOUTUBE_CONSTS.YOUTUBE:
        this.player.mute()
        break
      default:
        this.player.muted = true
    }
  }

  unMute = () => {
    switch (this.type) {
      case YOUTUBE_CONSTS.YOUTUBE:
        this.player.unMute()
        break
      default:
        this.player.muted = false
    }
  }

  isMuted = () => {
    switch (this.type) {
      case YOUTUBE_CONSTS.YOUTUBE:
        return this.player.isMuted()
      default:
        return this.player.muted
    }
  }
  removeEventListener = (event, method) => {
    this.player.removeEventListener(event, method)
  }

  addEventListener = (event, method) => {
    this.player.addEventListener(event, method)
  }

  getDuration = () => {
    switch (this.type) {
      case YOUTUBE_CONSTS.YOUTUBE:
        return this.player.getDuration()
      default:
        return this.player.duration
    }
  }

  getCurrentTime = () => {
    switch (this.type) {
      case YOUTUBE_CONSTS.YOUTUBE:
        return this.player.getCurrentTime()
      default:
        return this.player.currentTime
    }
  }

  setCurrentTime = (currentTime) => {
    switch (this.type) {
      case YOUTUBE_CONSTS.YOUTUBE:
        // this.player.seekTo(currentTime, true)
        this.player.seekTo(currentTime, true)
        break
      default:
        this.player.currentTime = currentTime
    }
  }
  /*
  clear (updateProgress, end, next) {
    this.player.removeEventListener('timeupdate', this.updateProgress)
    this.player.removeEventListener('ended', this.end)
    this.player.removeEventListener('error', this.next)
  } */
}
