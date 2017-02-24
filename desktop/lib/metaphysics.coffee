Q = require 'bluebird-q'
qs = require 'qs'
request = require 'superagent'
{ extend, some } = require 'underscore'
{ METAPHYSICS_ENDPOINT } = require('sharify').data
newrelic = require 'newrelic'

metaphysics = ({ method, query, variables, req } = {}) ->
  method ?= 'get'

  Q.promise (resolve, reject) ->
    r = request[method] METAPHYSICS_ENDPOINT
      .set 'Accept', 'application/json'

    if (token = req?.user?.get?('accessToken') or req?.user?.accessToken)?
      r.set 'X-ACCESS-TOKEN': token
      r.set 'X-USER-ID': req.user.id

    if method is 'get'
      r.query
        query: query
        variables: JSON.stringify variables
    else
      r.send
        query: query
        variables: variables

    r.end (err, response) ->
      if err?
        return reject err

      # Allow errors in resolving GraphQL data to not affect resolving the whole promise.
      # However, notify NewRelic.
      if response.body.errors?
        error = new Error JSON.stringify response.body.errors
        newrelic.noticeError(error, { crash: true })

      resolve response.body.data

metaphysics.debug = (req, res, send) ->
  if req.query.query?
    get = extend {}, send,
      variables: JSON.stringify send.variables

    res.redirect "#{METAPHYSICS_ENDPOINT}?#{qs.stringify get}"

    true

module.exports = metaphysics
