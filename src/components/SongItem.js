import '../styles/SongItem.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import autobind from 'autobind-decorator'
import { TABLE_FONT_COLOR } from '../constants'

class SongItem extends Component {

/*
  handleClick (song) {
    this.props.setActiveSong(song)
  } */

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
    this.props.setActiveSong(this.props.song)
  }

  render () {
    const { song, activeSong } = this.props

    return (
      <TableRow key={song._id} onClick={this.handleClick} style={{ 'fontSize' : '14px', 'color' : TABLE_FONT_COLOR }}>
        <TableRowColumn>
          <div style={{ 'display' : 'inline-block', 'verticalAlign' :'middle' }}>
            <img src={'data:image/png;base64,' + song.cover}
              height='40' width='40' style={{ 'marginRight' : '2vh' }} />
          </div>
          <div style={{ 'maxWidth' : '75%', 'display' : 'inline-block', 'verticalAlign' :'middle' }}>
            <div>
              {song.track_name}
            </div>
            <div className='div-hidden display-xs-down'
              style={{ 'fontSize' : '10px' }}>
              <span className='over-flow' style={{ 'maxWidth' : '100%' }}>
                {this.alignArtists(song.artists)}
              </span>
              <span>&nbsp;&#8226; {this.secondsToMinutes(song.track_length)} </span>
            </div>
          </div>
        </TableRowColumn>
        <TableRowColumn className='hidden-xs-down'>{this.alignArtists(song.artists)}</TableRowColumn>
        <TableRowColumn className='hidden-xs-down'>{this.secondsToMinutes(song.track_length)}</TableRowColumn>
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
