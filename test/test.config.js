require('raf/polyfill')
const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')

Enzyme.configure({
  adapter: new Adapter()
})
