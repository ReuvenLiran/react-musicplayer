import '../styles/SongsIndex.scss'
import React, { Component, PropTypes } from 'react'
import SongsList from '../containers/SongsListContainer'
import ReactMusicPlayerFloat from '../containers/ReactMusicPlayerFloatContainer'
import CircularProgress from 'material-ui/CircularProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './Header'
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

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    })
  };

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
          <Header />

          <div style={{ 'backgroundColor' : BASE_COLOR2, 'margin' : '0', 'width' : 'inherit' }} >
            <MuiThemeProvider>
              <Paper zDepth={2} style={{ 'height' : 'inherit', 'width' : 'inherit' }}>
               
                <Tabs onChange={this.handleChange}
                  value={this.state.slideIndex}> 
                  
                  <Tab style={{ 'color' : HEADER_FONT_COLOR, 'backgroundColor' : BASE_COLOR1 }}
                    label='Songs' value={0} />
                  <Tab style={{ 'color' : HEADER_FONT_COLOR, 'backgroundColor' : BASE_COLOR1 }}
                    label='Artists' value={1} />
                
                </Tabs>
             
              </Paper>

            </MuiThemeProvider>
           
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange} style={{'backgroundColor' : BASE_COLOR2 }}>

              <div >
                <SongsList songs={songs} />
              </div>
              <div>
                Artists
                Coming soon...
             </div>
            </SwipeableViews>
          </div>

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
