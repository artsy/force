//
// Passport.js serialize/deserialize functions that turn user data
// into a session.
//

// TODO: Remove let added for 'rewire'
let opts = require("../options")
// TODO: Remove let added for 'rewire'

let request = require("superagent")
const async = require("async")
const pick = require("lodash/pick")

module.exports.serialize = (req, user, done) =>
  async.parallel(
    [
      cb =>
        request
          .get(`${opts.ARTSY_URL}/api/v1/me`)
          .set({ "X-Access-Token": user.accessToken })
          .end(cb),
      cb =>
        request
          .get(`${opts.ARTSY_URL}/api/v1/me/authentications`)
          .set({ "X-Access-Token": user.accessToken })
          .end(cb),
    ],
    function (err, results) {
      if (err) {
        return done(err)
      }

      const [{ body: userData }, { body: authsData }] = Array.from(results)

      const data = pick(
        {
          ...userData,
          accessToken: user.accessToken,
          authentications: authsData,
        },
        ["accessToken", "authentications", ...opts.userKeys]
      )

      req.user = data

      done(null, data)
    }
  )

module.exports.deserialize = (user, done) => {
  done(null, user)
}
