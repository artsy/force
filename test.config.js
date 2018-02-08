require('@babel/register')({
  extensions: ['.ts', '.js', '.tsx', '.jsx'],
})

require('@babel/polyfill')
require('coffee-script/register')
require('raf/polyfill')
require('source-map-support/register')
require('should')
require('./lib/jade_hook')

const path = require('path')

// TODO: Look into why this bumps user off of other node command-line tab
require('dotenv').config({
  path: path.join(process.cwd(), '.env.test'),
})

const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')

Enzyme.configure({
  adapter: new Adapter(),
})
