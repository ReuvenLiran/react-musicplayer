import '../styles/SongList.scss'
import React, { PropTypes } from 'react'
import SongItem from '../containers/SongItem'

const SongsList = ({ songs }) => {
  return (
    <div className='card z-depth-2'>

      <table>
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
          {songs.map((song) => {
            return <SongItem song={song} />
          })}
        </tbody>
      </table>
    </div>
  )
}

SongsList.propTypes = {
  songs: PropTypes.array.isRequired
}

export default SongsList
