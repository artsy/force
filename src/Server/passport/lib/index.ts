import type { Express } from "express"
import extend from "lodash/extend"
import opts from "./options"
import setupApp from "./app"
import setupPassport from "./passport"
import type { PassportOptions } from "./types"

//
// Uses [passport.js](http://passportjs.org/) to setup authentication with
// various providers like direct login with Artsy, or oauth signin with Facebook.
//

interface ArtsyPassport {
  (options: Partial<PassportOptions>): Express
  options: PassportOptions
}

const artsyPassport = ((options: Partial<PassportOptions>) => {
  extend(opts, options)
  setupPassport()
  return setupApp()
}) as ArtsyPassport

artsyPassport.options = opts

export default artsyPassport

module.exports = artsyPassport
