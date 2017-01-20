import '../styles/SongsIndex.scss'
import React, { Component, PropTypes } from 'react'
import SongsList from '../containers/SongsListContainer'
// import ReactMusicPlayerFloat from '../containers/ReactMusicPlayerFloatContainer'
import MusicPlayer from '../containers/MusicPlayer'
import CircularProgress from './CircularProgress'
import Header from '../containers/Header'
import SwipeableViews from 'react-swipeable-views'
import { BASE_COLOR2 } from '../constants'

class SongsIndex extends Component {

  componentWillMount () {
    this.props.fetchSongs()
    this.state = {
      slideIndex: 0
    }
  }

  onSearch = (e) => {
    console.log('onSearch', this.props)
  }

  handleChangeTab = (e) => {
    let value = parseInt(e.target.id)
    this.setState({
      slideIndex: value
    })
  }

  handleChangeView = (value) => {
    this.setState({
      slideIndex: value
    })
  }

  render () {
    const { songs, loading, error } = this.props.songsList
    if (loading) {
      return (
        <div className='container'>
          <CircularProgress />
        </div>
      )
    } else if (error) {
      return <div className='alert alert-danger'>Error: {error.message}</div>
    } else {
      return (
        <div style={{ 'margin' : '0', 'width' : 'inherit' }} >
          <Header onSearch={this.onSearch} />

          <div className='row' style={{ 'margin' : '0', 'width' : '100%' }} >
            <div className='col s12'>
              <ul className='tabs' style={{ 'margin' : '0', 'width' : '100%' }}>
                <li id={0} className='tab col s6'
                  onClick={this.handleChangeTab}>
                    SONGS
                </li>
                <li id={1} className='tab col s6'
                  onClick={this.handleChangeTab}>
                    ARTISTS
                </li>
              </ul>
            </div>
          </div>

          <SwipeableViews
            className='swipableviews'
            index={this.state.slideIndex}
            style={{ 'backgroundColor' : BASE_COLOR2 }}>

            <div>
              <SongsList songs={songs} />
            </div>

            <div>
                Artists
                Coming soon...
             </div>

          </SwipeableViews>
          <MusicPlayer songs={songs} />
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
