import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router'
import { Tabs, Tab } from 'material-ui/Tabs'
// import SwipeableViews from 'react-swipeable-views'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
}

class Header extends Component {

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
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
            style={{ 'backgroundColor' : '#FF5722' }}
            iconClassNameRight='muidocs-icon-navigation-expand-more' />
        </ MuiThemeProvider>
      </div>
    )
  }
}


export default Header
