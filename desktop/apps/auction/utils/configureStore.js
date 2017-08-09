import analyticsMiddleware from 'desktop/apps/auction2/utils/analyticsMiddleware'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { contains } from 'underscore'
import { createStore, applyMiddleware } from 'redux'
import { data as sd } from 'sharify'

export default function configureStore (rootReducer, initialState = {}) {
  const middleware = [
    thunkMiddleware,
    analyticsMiddleware
  ]

  const enableLogger =
    contains(['development', 'staging'], sd.NODE_ENV) &&
    typeof window !== 'undefined'

  if (enableLogger) {
    middleware.push(
      createLogger({
        collapsed: true
      })
    )
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )

  return store
}
