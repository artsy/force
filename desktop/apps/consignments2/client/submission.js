import SubmissionFlow from '../components/submission_flow'
import ThankYou from '../components/thank_you'
import reducers from './reducers'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Router, Route } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'


function setupSubmissionFlow() {
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

  render(
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route exact path="/consign2/submission/" component={SubmissionFlow}/>
          <Route path="/consign2/submission/thank_you" component={ThankYou}/>
        </div>
      </Router>
    </Provider>,
    document.getElementById('consignments2-submission__flow')
  )
}

export default () => {
  setupSubmissionFlow()
}
