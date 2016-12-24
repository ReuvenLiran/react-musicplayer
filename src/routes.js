import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './pages/App'
import SongsIndex from './pages/SongsIndex'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={SongsIndex} />
    <Route path='/songs' component={SongsIndex} />
  </Route>
)
