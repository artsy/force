Q = require 'bluebird-q'
qs = require 'qs'
request = require 'superagent'
{ extend } = require 'underscore'
{ METAPHYSICS_ENDPOINT } = require('sharify').data

metaphysics = ({ method, query, variables, req } = {}) ->
  method ?= 'get'

  Q.promise (resolve, reject) ->
    r = request[method] METAPHYSICS_ENDPOINT
      .set 'Accept', 'application/json'

    if (token = req?.user?.get 'accessToken')?
      r.set 'X-ACCESS-TOKEN': token

    r
      .query
        query: query
        variables: JSON.stringify variables

      .end (err, response) ->
        if err?
          return reject err

        if response.body.errors?
          return reject JSON.stringify(response.body.errors)

        resolve response.body.data

metaphysics.debug = (req, res, send) ->
  if req.query.query?
    get = extend {}, send,
      variables: JSON.stringify send.variables

    res.redirect "#{METAPHYSICS_ENDPOINT}?#{qs.stringify get}"

    true

module.exports = metaphysics
