import { Component, PropTypes } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'

export default class App extends Component {
  constructor (props) {
    super(props)
    injectTapEventPlugin()
  }

  render () {
    return (

      /* <AppContainer> */
      this.props.children
      /* </AppContainer> */
    )
  }

  propTypes = {
    children: PropTypes.any
  }
}
