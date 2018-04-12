require('coffeescript/register')
require('@babel/register')({
  extensions: ['.ts', '.js', '.tsx', '.jsx'],
})

global.Promise = require('bluebird')

const artsyXapp = require('artsy-xapp')
const cache = require('./lib/cache')
const express = require('express')
const setup = require('./lib/setup').default
const app = (module.exports = express())

const {
  APP_URL,
  API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  NODE_ENV,
  PORT,
  PROFILE_MEMORY,
} = process.env

if (PROFILE_MEMORY) require('.src/lib/memory_profiler')()

// Add all of the middleware and global setup
setup(app)

// Connect to Redis
cache.setup(() => {
  // Get an xapp token
  artsyXapp.init({ url: API_URL, id: CLIENT_ID, secret: CLIENT_SECRET }, () => {
    // Start the server
    if (module === require.main) {
      const message =
        NODE_ENV === 'development'
          ? `\n\n  [Force] Booting on port ${PORT}... \n`
          : `\n\n  [Force] Started on ${APP_URL}. \n`

      app.listen(PORT, "0.0.0.0", () => console.log(message))
    }
  })
})
