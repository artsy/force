//
// Passport.js callbacks.
// These are functions that run after an OAuth flow, or after submitting a
// username/password form to login, signup, or link an account.
//

const extend = require("lodash/extend")
// TODO: Remove let added for 'rewire'
let request = require("superagent")
// TODO: Remove let added for 'rewire'
let opts = require("../options")
const artsyXapp = require("@artsy/xapp")
const ip = require("ip")

const resolveIPv4 = function (ipAddress) {
  if (ip.isV6Format(ipAddress) != null && ipAddress.indexOf("::ffff") >= 0) {
    return ipAddress.split("::ffff:")[1]
  }
  return ipAddress
}

const resolveProxies = function (req) {
  const ipAddress = resolveIPv4(req.connection.remoteAddress)
  if (req && req.headers && req.headers["x-forwarded-for"]) {
    return req.headers["x-forwarded-for"] + ", " + ipAddress
  }
  return ipAddress
}

module.exports.local = function (req, username, password, otp, done) {
  const payload = {
    client_id: opts.ARTSY_ID,
    client_secret: opts.ARTSY_SECRET,
    grant_type: "credentials",
    email: username,
    password,
  }

  if (req.body.otpRequired) {
    payload.otp_attempt = otp
  }

  const post = request
    .post(`${opts.ARTSY_URL}/oauth2/access_token`)
    .set({ "User-Agent": req.get("user-agent") })
    .send(payload)

  if (req && req.connection && req.connection.remoteAddress) {
    post.set("X-Forwarded-For", resolveProxies(req))
  }

  post.end(onAccessToken(req, done))
}

module.exports.facebook = function (req, token, refreshToken, profile, done) {
  if (profile && profile.emails && profile.emails[0]) {
    req.socialProfileEmail = profile.emails[0].value
  } else {
    req.socialProfileEmail = undefined
  }
  // Link Facebook account
  if (req.user) {
    return request
      .post(`${opts.ARTSY_URL}/api/v1/me/authentications/facebook`)
      .set({ "User-Agent": req.get("user-agent") })
      .send({
        oauth_token: token,
        access_token: req.user.accessToken,
      })
      .end(err => done(err, req.user))
    // Login or signup with Facebook
  } else {
    const post = request
      .post(`${opts.ARTSY_URL}/oauth2/access_token`)
      .set({ "User-Agent": req.get("user-agent") })
      .send({
        client_id: opts.ARTSY_ID,
        client_secret: opts.ARTSY_SECRET,
        grant_type: "oauth_token",
        oauth_token: token,
        oauth_provider: "facebook",
      })

    if (req && req.connection && req.connection.remoteAddress) {
      post.set("X-Forwarded-For", resolveProxies(req))
    }

    post.end(
      onAccessToken(req, done, {
        oauth_token: token,
        provider: "facebook",
        name: profile != null ? profile.displayName : undefined,
      })
    )
  }
}

module.exports.google = function (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) {
  // Link Google account
  if (req.user) {
    return request
      .post(`${opts.ARTSY_URL}/api/v1/me/authentications/google`)
      .set({ "User-Agent": req.get("user-agent") })
      .send({
        oauth_token: accessToken,
        access_token: req.user.accessToken,
      })
      .end(err => done(err, req.user))
    // Login or signup with Google
  } else {
    const post = request
      .post(`${opts.ARTSY_URL}/oauth2/access_token`)
      .set({ "User-Agent": req.get("user-agent") })
      .send({
        client_id: opts.ARTSY_ID,
        client_secret: opts.ARTSY_SECRET,
        grant_type: "oauth_token",
        oauth_token: accessToken,
        oauth_provider: "google",
      })

    if (req && req.connection && req.connection.remoteAddress) {
      post.set("X-Forwarded-For", resolveProxies(req))
    }

    post.end(
      onAccessToken(req, done, {
        oauth_token: accessToken,
        provider: "google",
        name: profile != null ? profile.displayName : undefined,
      })
    )
  }
}

module.exports.apple = function (
  req,
  idToken,
  decodedIdToken,
  accessToken,
  refreshToken,
  done
) {
  const user = req.appleProfile

  let displayName = null
  if (user && user.name && user.name.firstName && user.name.lastName) {
    displayName = user.name.firstName + " " + user.name.lastName
  }

  // Link Apple account
  if (req.user) {
    return request
      .post(`${opts.ARTSY_URL}/api/v1/me/authentications/apple`)
      .set({ "User-Agent": req.get("user-agent") })
      .send({
        name: displayName,
        email: decodedIdToken.email,
        apple_uid: decodedIdToken.sub,
        id_token: idToken,
        oauth_token: accessToken,
        access_token: req.user.accessToken,
      })
      .end(err => done(err, req.user))
  } else {
    const post = request
      .post(`${opts.ARTSY_URL}/oauth2/access_token`)
      .set({ "User-Agent": req.get("user-agent") })
      .send({
        client_id: opts.ARTSY_ID,
        client_secret: opts.ARTSY_SECRET,
        grant_type: "apple_uid",
        name: displayName,
        id_token: idToken,
        email: decodedIdToken.email,
        apple_uid: decodedIdToken.sub,
      })

    if (req && req.connection && req.connection.remoteAddress) {
      post.set("X-Forwarded-For", resolveProxies(req))
    }

    post.end(
      onAccessToken(req, done, {
        provider: "apple",
        apple_uid: decodedIdToken.sub,
        name: displayName,
        id_token: idToken,
        email: decodedIdToken.email,
      })
    )
  }
}

const onAccessToken = (req, done, params) =>
  function (err, res) {
    // Treat bad responses from Gravity as errors and get the most relavent
    // error message.
    let msg
    if (
      (err && !(res != null ? res.body : undefined)) ||
      (!err && (res != null ? res.status : undefined) > 400)
    ) {
      err = new Error(`Gravity returned a generic ${res.status} html page`)
    }
    if (!err && (res != null ? res.body.access_token : undefined) == null) {
      err = new Error("Gravity returned no access token and no error")
    }
    if (err != null) {
      if (res && res.body && res.body.error_description) {
        msg = res.body.error_description
      } else if (res && res.body && res.body.error) {
        msg = res.body.error
      } else if (res && res.text) {
        msg = res.text
      } else if (err && err.stack) {
        msg = err.stack
      } else if (err) {
        msg = err.toString()
      }

      err.message = msg
    }
    // No errors—create the user from the access token.
    if (!err) {
      return done(null, { accessToken: res.body.access_token })
      // If there's no user linked to this account, create the user via the POST
      // /user API. Then attempt to fetch the access token again from Gravity and
      // recur back into this onAcccessToken callback.
    } else if (msg.match("no account linked") != null) {
      if ((req != null ? req.session : undefined) != null && params != null) {
        const {
          sign_up_intent,
          sign_up_referer,
          agreed_to_receive_emails,
          accepted_terms_of_service,
        } = req.session
        extend(params, {
          sign_up_intent,
          sign_up_referer,
          agreed_to_receive_emails,
          accepted_terms_of_service,
        })
      }

      req.artsyPassportSignedUp = true
      return request
        .post(opts.ARTSY_URL + "/api/v1/user")
        .send(params)
        .set({ "User-Agent": req.get("user-agent") })
        .set({ "X-Xapp-Token": artsyXapp.token })
        .set({ Referer: req.get("referer") })
        .end(function (err) {
          if (err) {
            return done(err)
          }

          let auth_params = {}
          if (params.provider === "apple") {
            auth_params = extend(params, {
              grant_type: "apple_uid",
            })
          } else {
            auth_params = extend(params, {
              grant_type: "oauth_token",
              oauth_provider: params.provider,
            })
          }

          const post = request
            .post(`${opts.ARTSY_URL}/oauth2/access_token`)
            .set({ "User-Agent": req.get("user-agent") })
            .send(
              extend(auth_params, {
                client_id: opts.ARTSY_ID,
                client_secret: opts.ARTSY_SECRET,
              })
            )

          if (req && req.connection && req.connection.remoteAddress) {
            post.set("X-Forwarded-For", resolveProxies(req))
          }

          post.end(onAccessToken(req, done, params))
        })
      // Uncaught Exception.
    } else {
      console.warn(`Error requesting an access token from Artsy '${msg}'`)
      done(err)
    }
  }
