import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import { DEEP_ORANGE } from '../constants'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import SwipeableViews from 'react-swipeable-views'

class Header extends Component {

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
    console.log('DEEP_ORANGE', DEEP_ORANGE)
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    })
  }

  render () {
    return (
      <div style={{ 'margin' : '0', 'width' : 'inherit' }} >
        <MuiThemeProvider>
          <AppBar
            title='Music Libary'
            style={{ 'backgroundColor' : DEEP_ORANGE }}
            iconClassNameRight='muidocs-icon-navigation-expand-more'
         />
        </MuiThemeProvider>
      </div>

    )
  }
}

export default Header
