import '../styles/SongList.scss'
import React, { Component, PropTypes } from 'react'
import SongItem from '../containers/SongItemContainer'
import { TABLE_HEADER_FONT_COLOR, BASE_COLOR3 } from '../constants'

class SongsList extends Component {

  cardStyle = {
    'marginLeft' : '1vw',
    'marginRight' : '1vw',
    'marginTop' : '3vh',
    'backgroundColor' : BASE_COLOR3
  }

  tableHeaderStyle = {
    'color' : 'black', // TABLE_HEADER_FONT_COLOR,
    'fontSize' : '18px'
  }

  renderSongs (songs) {
    return songs.map((song) => {
      return (
        <SongItem song={song} />
      )
    })
  }

  render () {
    const { songs } = this.props
    return (
      <div className='container'>
        <div className='card' style={this.cardStyle}>

          <table className='highlight'
            style={{ 'margin' : '5px' }}>
            <thead className='hidden-xs-down'>
              <tr>
                <th data-field='id'>Name</th>
                <th data-field='name'>Artists</th>
                <th data-field='time'>
                  <i className='material-icons'>access_time</i>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.renderSongs(songs)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

SongsList.propTypes = {
  songs: PropTypes.array.isRequired
}

export default SongsList
