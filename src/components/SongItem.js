import '../styles/SongItem.scss'
import React, { Component } from 'react'
import classnames from 'classnames'
/*
const colorActive = '#3A3A3A'
const colorNotActive = '#222222'
*/
class SongItem extends Component {
/*
  constructor (props) {
    super(props)
  } */

  handleClick (song) {
    this.props.setActiveSong(song)
  }

  secondsToMinutes (s) {
    var m = Math.floor(s / 60) // Get remaining minutes
    s -= m * 60
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) // zero padding on minutes and seconds
  }

  alignArtists (artists) {
    var strArtists = ''
    artists.map((artist) => {
      strArtists = strArtists.concat(artist).concat(', ')
    })

    return strArtists.slice(0, strArtists.length - 2)
  }
/*
style(song, activeSong) {
  return (song._id == activeSong._id ?
         {backgroundColor: colorActive} : {backgroundColor: colorNotActive });
   }
*/
  render () {
    const { song, activeSong } = this.props

    let songItemClass = classnames('btn btn-lg song-item', { 'active-song': song._id == activeSong._id })

    return (
      <li className={songItemClass} onClick={() => { this.handleClick(song) }}
        key={song.file}>
        <h3 className='list-group-item-heading'>{song.track_name}</h3>
        <div className='artists'>{this.alignArtists(song.artists)} </div>
        <div className='duration'> {this.secondsToMinutes(song.track_length)} </div>
      </li>
    )
  }
}
export default SongItem
