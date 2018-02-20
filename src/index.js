require('babel-core/register')
require('ts-node').register()
require('coffeescript/register')

global.Promise = require('bluebird')

const artsyXapp = require('artsy-xapp')
const cache = require('./lib/cache')
const express = require('express')
const setup = require('./lib/setup').default

const app = (module.exports = express())
const { API_URL, CLIENT_ID, CLIENT_SECRET, PORT, PROFILE_MEMORY } = process.env

if (PROFILE_MEMORY) require('.src/lib/memory_profiler')()

// Add all of the middleware and global setup
setup(app)

// Connect to Redis
cache.setup(() => {
  // Get an xapp token
  artsyXapp.init({ url: API_URL, id: CLIENT_ID, secret: CLIENT_SECRET }, () => {
    // Start the server
    if (module === require.main) {
      app.listen(PORT, () =>
        console.log(`\n\n  [Force] Booting on port ${PORT}... \n`)
      )
    }
  })
})
