require('raf/polyfill')
const path = require('path')

// TODO: Look into why this bumps user off of other node command-line tab
require('dotenv').config({
  path: path.join(process.cwd(), '.env.test')
})

const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')

Enzyme.configure({
  adapter: new Adapter()
})
