require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx"],
})

require("coffeescript/register")
require("raf/polyfill")
require("should")
require("./src/lib/jade_hook")

// FIXME: Do we need this?
// NOTE: Once we do AOT compilation we probably want to re-enable this on the server in development mode only.
// require('source-map-support/register')

const path = require("path")
const Adapter = require("enzyme-adapter-react-16")
const Enzyme = require("enzyme")
const sd = require("sharify").data

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
    function() {
      return {
        matches: false,
        addListener: function() {},
        removeListener: function() {},
      }
    }
  window.alert =
    window.alert ||
    function(msg) {
      console.log(msg)
    }
  window.scrollTo = window.scrollTo || function() {}
} catch (error) {}

sd.AP = {
  loginPagePath: "/login",
  signupPagePath: "/signup",
  facebookPath: "/facebook",
  twitterPath: "/twitter",
}
sd.APP_URL = "http://artsy.net"
sd.RECAPTCHA_KEY = "RECAPTCHA_KEY"
