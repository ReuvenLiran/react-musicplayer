import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import { HEADER_FONT_COLOR, BASE_COLOR1 } from '../constants'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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
            showMenuIconButton={false}
            style={{ 'color' : HEADER_FONT_COLOR, 'backgroundColor' : BASE_COLOR1 }}
         />
        </MuiThemeProvider>
      </div>

    )
  }
}

export default Header
