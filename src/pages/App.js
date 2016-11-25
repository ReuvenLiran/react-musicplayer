import { Component, PropTypes } from 'react'

App.propTypes = {
  children: PropTypes.any
}

export default class App extends Component {
  render () {
    return (
      /* <AppContainer> */
      this.props.children
      /* </AppContainer> */
    )
  }
}
