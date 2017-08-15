import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import geo from '../../../components/geo/index.coffee'
import reducers from './reducers'
import createHistory from 'history/createBrowserHistory'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { routerMiddleware } from 'react-router-redux'
import App from '../components/app'

function setupSubmissionFlow () {
  // load google maps for autocomplete
  geo.loadGoogleMaps()

  const loggerMiddleware = createLogger()
  const history = createHistory()
  const store = createStore(
    reducers,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      routerMiddleware(history),
      loggerMiddleware // middleware that logs actions
    )
  )

  render((
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>
  ),
  document.getElementById('consignments-submission__flow')
  )
}

export default () => {
  setupSubmissionFlow()
}
