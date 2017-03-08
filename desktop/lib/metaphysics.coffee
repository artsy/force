Q = require 'bluebird-q'
qs = require 'qs'
request = require 'superagent'
{ extend, some } = require 'underscore'
{ METAPHYSICS_ENDPOINT, API_REQUEST_TIMEOUT } = require('sharify').data

metaphysics = ({ method, query, variables, req } = {}) ->
  method ?= 'post'

  Q.promise (resolve, reject) ->
    r = request[method] METAPHYSICS_ENDPOINT
      .set 'Accept', 'application/json'
      .timeout API_REQUEST_TIMEOUT

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

      if response.body.errors?
        error = new Error JSON.stringify response.body.errors
        error.status = 404 if some(response.body.errors, ({ message }) -> message.match /Not Found/)
        error.data = response.body.data
        return reject error

      resolve response.body.data

metaphysics.debug = (req, res, send) ->
  if req.query.query?
    get = extend {}, send,
      variables: JSON.stringify send.variables

    res.redirect "#{METAPHYSICS_ENDPOINT}?#{qs.stringify get}"

    true

module.exports = metaphysics
