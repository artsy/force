require('@babel/register')({
  extensions: ['.ts', '.js', '.tsx', '.jsx'],
})

require('coffeescript/register')
require('@babel/polyfill')
require('raf/polyfill')
require('should')
require('./src/lib/jade_hook')

// FIXME: Do we need this?
// NOTE: Once we do AOT compilation we probably want to re-enable this on the server in development mode only.
// require('source-map-support/register')

const path = require('path')
const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')

// TODO: Look into why this bumps user off of other node command-line tab
require('dotenv').config({
  path: path.join(process.cwd(), '.env.test'),
})

Enzyme.configure({
  adapter: new Adapter(),
})
