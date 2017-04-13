global.Promise = require('bluebird')
require('coffee-script/register')
require('babel-core/register')
const artsyXapp = require('artsy-xapp')
const cache = require('./lib/cache')
const express = require('express')
const setup = require('./lib/setup').default

const app = module.exports = express()
const { API_URL, CLIENT_ID, CLIENT_SECRET, PORT } = process.env

// Add all of the middleware and global setup
setup(app)

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
