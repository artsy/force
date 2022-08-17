//
// Uses [passport.js](http://passportjs.org/) to setup authentication with
// various providers like direct login with Artsy, or oauth signin with Facebook.
//

const extend = require("lodash/extend")
const opts = require("./options")
const setupApp = require("./app/index")
const setupPassport = require("./passport/index")

module.exports = function (options) {
  extend(opts, options)
  setupPassport()
  return setupApp()
}

module.exports.options = opts
