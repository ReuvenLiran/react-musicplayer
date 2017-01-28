import { connect } from 'react-redux'
import { setActiveSong } from '../actions/songs'
import React, { Component, PropTypes } from 'react'
import SongItem from '../components/SongItem'
import Utils from '../utils/utils'

const mapStateToProps = (state) => {
  return {
    activeSong: state.songs.activeSong
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveSong: (song) => {
      dispatch(setActiveSong(song))
    }
  }
}

class SongItemContainer extends Component {

  constructor (props) {
    super(props)
    this.song = this.props.song
    let duration
    let albumCover

    let artists = Utils.alignArtists(this.song.artists)

    if (this.song.artists[0] === 'Youtube') {
      duration = this.song.duration
      albumCover = this.song.albumCover
    } else {
      duration = Utils.secondsToMinutes(this.song.duration)
      albumCover = 'data:image/png;base64,' + this.song.albumCover
    }
    this.state = {
      song: {
        title: this.song.title,
        artists: artists,
        duration: duration,
        albumCover: albumCover }
    }
  }
/*
  secondsToMinutes (s) {
    var m = Math.floor(s / 60) // Get remaining minutes
    s -= m * 60
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) // zero padding on minutes and seconds
  } */
  /*
  alignArtists (artists) {
    var strArtists = ''
    artists.map((artist) => {
      strArtists = strArtists.concat(artist).concat(', ')
    })

    return strArtists.slice(0, strArtists.length - 2)
  } */

  handleClick = () => {
    this.props.setActiveSong(this.song)
  }

  render () {
    return (
      <SongItem song={this.state.song} onClick={this.handleClick} />
    )
  }
}

SongItemContainer.propTypes = {
  song: PropTypes.object.isRequired,
  setActiveSong: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SongItemContainer)
