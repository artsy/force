//
// Passport.js serialize/deserialize functions that turn user data
// into a session.
//

const opts = require("../options")
const request = require("superagent")
const pick = require("lodash/pick")

module.exports.serialize = (req, user, done) => {
  Promise.all([
    request
      .get(`${opts.ARTSY_URL}/api/v1/me`)
      .set({ "X-Access-Token": user.accessToken }),
    request
      .get(`${opts.ARTSY_URL}/api/v1/me/authentications`)
      .set({ "X-Access-Token": user.accessToken }),
  ])
    .then(([{ body: userData }, { body: authsData }]) => {
      const data = pick(
        {
          ...userData,
          accessToken: user.accessToken,
          authentications: authsData,
        },
        ["accessToken", "authentications", ...opts.userKeys],
      )

      req.user = data

      done(null, data)
    })
    .catch(err => done(err))
}

module.exports.deserialize = (user, done) => {
  done(null, user)
}
