import '../styles/SongList.scss'
import React, { Component } from 'react'
import SongsIndexContainer from '../containers/SongsIndexContainer'
// import ReactMusicPlayer from '../containers/ReactMusicPlayerContainer'

class SongsIndex extends Component {

  render () {
    return (
      <div style={{ 'margin' : '0', 'width' : 'inherit' }} >
        <SongsIndexContainer />
      </div>
    )
  }
}

export default SongsIndex

