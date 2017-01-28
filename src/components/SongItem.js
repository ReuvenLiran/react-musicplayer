import '../styles/SongItem.scss'
import React, { PropTypes } from 'react'

const SongItem = ({ song, onClick }) => {
  return (
    <tr className='song-item' onClick={onClick}>
      <td>
        <div className='album-cover-container'>
          <img src={song.albumCover} className='album-cover' />

        </div>
        <div className='song-metadata-mobile'>
          <span className='song-title'>
            {song.title}
          </span>
          <div className='div-hidden display-xs-down artists-duration'>
            <span className='over-flow song-artist'>
              {song.artists}
            </span>
            <span className='song-time'>&nbsp;&#8226; {song.duration} </span>
          </div>
        </div>
      </td>
      <td className='hidden-xs-down over-flow'>{song.artists}</td>
      <td className='hidden-xs-down'>{song.duration}</td>
    </tr>
  )
}

SongItem.propTypes = {
  song: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SongItem
