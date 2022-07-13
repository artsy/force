/**
 * This file is required for mocha specific global test setup steps
 */

require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx"],
})

require("should")

const chai = require("chai")
chai.use(require("chai-passport-strategy"))

const path = require("path")
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17")
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
  googlePath: "/google",
}
sd.APP_URL = "http://artsy.net"
sd.RECAPTCHA_KEY = "RECAPTCHA_KEY"
