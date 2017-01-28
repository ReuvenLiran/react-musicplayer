import '../styles/SongsIndex.scss'
import React, { Component, PropTypes } from 'react'
import SongsList from './SongsList'
import MusicPlayer from '../containers/MusicPlayer'
import CircularProgress from './CircularProgress'
import SwipeableViews from 'react-swipeable-views'
import Tabs from './Tabs'
import { BASE_COLOR2 } from '../utils/constants'
import FloatButton from './FloatButton'
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
          <Tabs onClick={this.handleChangeTab} activeTab={this.state.slideIndex} />
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

          <FloatButton icon={'file_download'} />
          <MusicPlayer songs={songs} />
        </div>
      )
    }
  }
}

SongsIndex.propTypes = {
  songsList: PropTypes.object.isRequired,
  fetchSongs: PropTypes.func.isRequired
}

export default SongsIndex
