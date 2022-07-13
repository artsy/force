const sd = require("sharify").data

require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx"],
})

const path = require("path")
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17")
const Enzyme = require("enzyme")

// TODO: Look into why this bumps user off of other node command-line tab
require("dotenv").config({
  path: path.join(process.cwd(), ".env.test"),
})

Enzyme.configure({
  adapter: new Adapter(),
})

try {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      }
    }
  window.alert =
    window.alert ||
    function (msg) {
      console.log(msg)
    }
  window.scrollTo = window.scrollTo || function () {}
} catch (error) {
  // Do nothing
}

// Used for Acceptance tests
require("raf/polyfill")
require("should")

// Used by relay
sd.METAPHYSICS_ENDPOINT = "http://localhost:5003"

// https://jestjs.io/docs/en/troubleshooting#unresolved-promises
global.Promise = require("promise")
