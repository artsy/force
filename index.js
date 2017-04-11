require('coffee-script/register')
require('babel-core/register')
const artsyError = require('artsy-error-handler')
const artsyXapp = require('artsy-xapp')
const cache = require('./lib/cache')
const express = require('express')
const newrelic = require('artsy-newrelic')
const path = require('path')
const setup = require('./lib/setup').default
const memoryProfiler = require('./lib/memory_profiler')

// Use Bluebird for performance
global.Promise = require('bluebird')

// Enable memory profiling
memoryProfiler()

const app = module.exports = express()
const { API_URL, CLIENT_ID, CLIENT_SECRET, PORT } = process.env

// Setup app
app.use(newrelic)
setup(app)
artsyError.handlers(app, {
  template: path.resolve(
    __dirname,
    'desktop/components/main_layout/templates/error.jade'
  )
})

// Connect to Redis
cache.setup(() => {
  // Get an xapp token
  artsyXapp.init({ url: API_URL, id: CLIENT_ID, secret: CLIENT_SECRET }, () => {
    // Start the server
    if (module === require.main) {
      app.listen(PORT, () => console.log(`Force listening on port ${PORT}`))
    }
  })
})
