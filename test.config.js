require('babel-register')
require('ts-node').register()
require('coffeescript/register')
require('source-map-support/register')
require('babel-polyfill')
require('raf/polyfill')
require('./lib/jade_hook')
require('should')

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
