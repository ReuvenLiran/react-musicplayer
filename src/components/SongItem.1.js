import '../styles/SongItem.scss'
import React, { Component, PropTypes } from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import autobind from 'autobind-decorator'
import { TABLE_FONT_COLOR } from '../constants'

class SongItem extends Component {

  constructor (props) {
    super(props)
    this.song = this.props.song
    let duration
    let albumCover

    let artists = this.alignArtists(this.song.artists)

    if (this.song.artists[0] === 'Youtube') {
      duration = this.song.duration
      albumCover = this.song.albumCover
    } else {
      duration = this.secondsToMinutes(this.song.duration)
      albumCover = 'data:image/png;base64,' + this.song.albumCover
    }
    this.state = {
      artists: artists,
      duration: duration,
      albumCover: albumCover
    }
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

  @autobind
  handleClick () {
    this.props.setActiveSong(this.song)
  }

  render () {
    return (
      <TableRow key={this.song._id} onClick={this.handleClick} style={{ 'fontSize' : '14px', 'color' : TABLE_FONT_COLOR }}>
        <TableRowColumn>
          <div style={{ 'display' : 'inline-block', 'verticalAlign' :'middle' }}>
            <img src={this.state.albumCover}
              height='40' width='40' style={{ 'marginRight' : '2vh' }} />
          </div>
          <div style={{ 'maxWidth' : '75%', 'display' : 'inline-block', 'verticalAlign' :'middle' }}>
            <div>
              {this.song.title}
            </div>
            <div className='div-hidden display-xs-down'
              style={{ 'fontSize' : '10px' }}>
              <span className='over-flow' style={{ 'maxWidth' : '100%' }}>
                {this.state.artists}
              </span>
              <span>&nbsp;&#8226; {this.state.duration} </span>
            </div>
          </div>
        </TableRowColumn>
        <TableRowColumn className='hidden-xs-down'>{this.state.artists}</TableRowColumn>
        <TableRowColumn className='hidden-xs-down'>{this.state.duration}</TableRowColumn>
      </TableRow>
    )
  }
}

SongItem.propTypes = {
  song: PropTypes.object.isRequired,
  setActiveSong: PropTypes.func.isRequired,
  activeSong: PropTypes.object.isRequired
}

export default SongItem
