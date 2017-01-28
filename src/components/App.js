import React, { Component, PropTypes } from 'react'
import SongsIndexContainer from '../containers/SongsIndexContainer'
import Header from '../containers/Header'

export default class App extends Component {
  componentWillMount () {
    // this.props.loadUserFromToken()
  }

  render () {
    return (
      <div>
        <Header />
        <SongsIndexContainer />
      </div>
    )
  }

  propTypes = {
    children: PropTypes.any
  }
}
