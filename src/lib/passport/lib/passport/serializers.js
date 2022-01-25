//
// Passport.js serialize/deserialize functions that turn user data
// into a session.
//

// TODO: Remove let added for 'rewire'
let opts = require('../options');
// TODO: Remove let added for 'rewire'
let request = require('superagent');
const async = require('async');

module.exports.serialize = (user, done) => async.parallel([
  cb => request
    .get(`${opts.ARTSY_URL}/api/v1/me`)
    .set({'X-Access-Token': user.get('accessToken')}).end(cb),
  cb => request
    .get(`${opts.ARTSY_URL}/api/v1/me/authentications`)
    .set({'X-Access-Token': user.get('accessToken')}).end(cb)
], function(err, results) {
  if (err) {
    return done(err);
  }
  const [{ body: userData }, { body: authsData }] = Array.from(results);
  user.set(userData).set({authentications: authsData});

  const keys = ['accessToken', 'authentications'].concat(opts.userKeys);
  done(null, user.pick(keys));
});

module.exports.deserialize = (userData, done) => done(null, new opts.CurrentUser(userData));
