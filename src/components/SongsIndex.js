import '../styles/SongList.scss'
import React, { Component, PropTypes } from 'react'
import SongsList from '../containers/SongsListContainer'
import ReactMusicPlayerFloat from '../containers/ReactMusicPlayerFloatContainer'

class SongsIndex extends Component {

  componentWillMount () {
    this.props.fetchSongs()
  }

  render () {
    const { songs, loading, error } = this.props.songsList

    if (loading) {
      return <div className='container'><h1>Loading...</h1></div>
    } else if (error) {
      return <div className='alert alert-danger'>Error: {error.message}</div>
    } else {
      // console.log(this.props.songsList)
      return (
        <div className='container' style={{ 'margin' : '0', 'height' : '100%', 'width' : 'inherit' }} >
          <SongsList height='80%' songs={songs} />
          <ReactMusicPlayerFloat height='20%' songs={songs} song={songs[0]} />
        </div>
      )
    }
  }
}

SongsIndex.propTypes = {
  songsList: PropTypes.array.isRequired,
  fetchSongs: PropTypes.func.isRequired
}

export default SongsIndex
