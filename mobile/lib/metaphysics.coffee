Q = require 'bluebird-q'
qs = require 'qs'
request = require 'superagent'
{ extend } = require 'underscore'
{ METAPHYSICS_ENDPOINT, API_REQUEST_TIMEOUT } = require('sharify').data

metaphysics = ({ query, variables, req } = {}) ->
  Q.promise (resolve, reject) ->
    get = request
      .get METAPHYSICS_ENDPOINT
      .set 'Accept', 'application/json'
      .timeout API_REQUEST_TIMEOUT

    if (token = req?.user?.get 'accessToken')?
      get.set 'X-ACCESS-TOKEN': token

    get
      .query
        query: query
        variables: JSON.stringify variables
      .end (err, response) ->
        return reject err if err?

        if response.body.errors?
          return reject JSON.stringify(response.body.errors)
        resolve response.body.data

metaphysics.debug = (req, res, send) ->
  if req.query.query?
    get = extend {}, send, variables: JSON.stringify send.variables
    res.redirect "#{METAPHYSICS_ENDPOINT}?#{qs.stringify get}"
    true

module.exports = metaphysics
