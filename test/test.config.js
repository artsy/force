const path = require('path')

require('raf/polyfill')

require('dotenv').config({
  path: path.join(process.cwd(), '.env.test')
})

const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')

Enzyme.configure({
  adapter: new Adapter()
})
