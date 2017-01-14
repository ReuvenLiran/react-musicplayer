import '../styles/SongsIndex.scss'
import React, { Component, PropTypes } from 'react'
import SongsList from '../containers/SongsListContainer'
import ReactMusicPlayerFloat from '../containers/ReactMusicPlayerFloatContainer'
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from '../containers/Header'
import { Tabs, Tab } from 'material-ui/Tabs'
import Paper from 'material-ui/Paper'
import SwipeableViews from 'react-swipeable-views'
import { HEADER_FONT_COLOR, BASE_COLOR2, BASE_COLOR1 } from '../constants'

class SongsIndex extends Component {

  componentWillMount () {
    this.props.fetchSongs()
    this.state = {
      slideIndex: 0
    }
  }

  onSearch = (e) => {
    console.log('onSearch',this.props)
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
          <div id='CircularProgress'>
            <MuiThemeProvider>
              <CircularProgress size={52} />
            </MuiThemeProvider>
          </div>
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
          <ReactMusicPlayerFloat height='20%' songs={songs} song={songs[0]} />
        </div>
      )
/*
      return (

        <div style={{ 'margin' : '0', 'width' : 'inherit' }} >
          <Header />
        </div>

      ) */
    }
  }
}

SongsIndex.propTypes = {
  songsList: PropTypes.array.isRequired,
  fetchSongs: PropTypes.func.isRequired
}

export default SongsIndex
