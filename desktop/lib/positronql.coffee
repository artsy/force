Q = require 'bluebird-q'
qs = require 'qs'
request = require 'superagent'
{ extend, some } = require 'underscore'
{ POSITRON_URL } = require('sharify').data

POSITRON_GRAPHQL_URL = POSITRON_URL + '/api/graphql'

positronql = ({ method, query, variables, req } = {}) ->
  method ?= 'get'

  Q.promise (resolve, reject) ->
    r = request[method] POSITRON_GRAPHQL_URL
      .set 'Accept', 'application/json'
      .set 'X-Access-Token', req.user && req.user.get('accessToken')

    r.query
      query: query
      variables: JSON.stringify variables

    r.end (err, response) ->
      if err?
        return reject err

      if response.body.errors?
        error = new Error JSON.stringify response.body.errors
        error.status = 404 if some(response.body.errors, ({ message }) -> message.match /Not Found/)
        return reject error

      resolve response.body.data

positronql.debug = (req, res, send) ->
  if req.query.query?
    get = extend {}, send,
      variables: JSON.stringify send.variables

    res.redirect "#{POSITRON_GRAPHQL_URL}?#{qs.stringify get}"

    true

module.exports = positronql
