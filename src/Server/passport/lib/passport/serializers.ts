import type { PassportDone, PassportRequest, PassportUser } from "../types"

import pick from "lodash/pick"
import { requestGravity } from "../http"
import opts from "../options"

//
// Passport.js serialize/deserialize functions that turn user data
// into a session.
//
export const serialize = (
  req: PassportRequest,
  user: PassportUser,
  done: PassportDone,
) => {
  Promise.all([
    requestGravity({
      headers: { "X-Access-Token": user.accessToken },
      method: "GET",
      url: `${opts.ARTSY_URL}/api/v1/me`,
    }),
    requestGravity({
      headers: { "X-Access-Token": user.accessToken },
      method: "GET",
      url: `${opts.ARTSY_URL}/api/v1/me/authentications`,
    }),
  ])
    .then(([{ body: userData }, { body: authsData }]) => {
      const data = pick(
        {
          ...userData,
          accessToken: user.accessToken,
          authentications: authsData,
        },
        ["accessToken", "authentications", ...opts.userKeys],
      ) as PassportUser

      req.user = data

      done(null, data)
    })
    .catch(err => done(err))
}

export const deserialize = (user: PassportUser, done: PassportDone) => {
  done(null, user)
}
