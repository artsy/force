/**
 * This file is required for mocha specific global test setup steps
 */

require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx"],
})

require("coffeescript/register")
require("should")
require("./src/lib/jade_hook")

const path = require("path")
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
const Enzyme = require("enzyme")
const sd = require("sharify").data

require("dotenv").config({
  path: path.join(process.cwd(), ".env.test"),
})

Enzyme.configure({
  adapter: new Adapter(),
})

sd.AP = {
  loginPagePath: "/login",
  signupPagePath: "/signup",
  facebookPath: "/facebook",
  googlePath: "/facebook",
  twitterPath: "/twitter",
}
sd.APP_URL = "http://artsy.net"
sd.RECAPTCHA_KEY = "RECAPTCHA_KEY"

global.stitch = {
  components: {
    NavBar: x => x,
    Footer: x => x,
  },
}
