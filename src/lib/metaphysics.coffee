qs = require 'qs'
request = require 'superagent'
{ extend, some } = require 'underscore'
{ METAPHYSICS_ENDPOINT, API_REQUEST_TIMEOUT, REQUEST_ID } = require('sharify').data
ip = require 'ip'

resolveIPv4 = (ipAddress) ->
  if ip.isV6Format(ipAddress)? and ipAddress.indexOf('::ffff') >= 0
    return ipAddress.split('::ffff:')[1]
  return ipAddress

resolveProxies = (req) ->
  ipAddress = resolveIPv4(req.connection.remoteAddress)
  if req?.headers?["x-forwarded-for"]?
    return req.headers["x-forwarded-for"] + ", " + ipAddress
  else
    return ipAddress

metaphysics = ({ query, variables, req } = {}) ->
  sentRequestId = REQUEST_ID || req?.id || 'implement-me'
  new Promise (resolve, reject) ->
    post = request
      .post METAPHYSICS_ENDPOINT
      .set 'Accept', 'application/json'
      .set 'X-Request-Id', sentRequestId
      .timeout API_REQUEST_TIMEOUT

    if (token = req?.user?.get?('accessToken') or req?.user?.accessToken)?
      post.set 'X-ACCESS-TOKEN': token
      post.set 'X-USER-ID': req.user.id

    if req?.connection?.remoteAddress?
      post.set 'X-Forwarded-For', resolveProxies req

    post
      .send
        query: query
        variables: variables

      .end (err, response) ->
        return reject err if err?

        if response.body.errors?
          error = new Error JSON.stringify response.body.errors
          error.status = 404 if some(response.body.errors, ({ message }) -> message.match /Not Found/)
          error.data = response.body.data
          return reject error

        resolve response.body.data

metaphysics.debug = (req, res, send) ->
  if req.query.query?
    get = { query: send.query, variables: JSON.stringify send.variables }

    res.redirect "#{METAPHYSICS_ENDPOINT}?#{qs.stringify get}"

    true

module.exports = metaphysics
