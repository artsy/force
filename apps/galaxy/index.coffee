express = require 'express'
request = require 'superagent'
{ GALAXY_URL, GALAXY_TOKEN } = require '../../config'

app = module.exports = express()

# Proxy requests to Galaxy so as to not expose the token
# Pull out the _embedded data and discard the root
app.get '/galaxy', (req, res, next) ->
  { type } = req.query

  return next(new Error 'Missing required `type` param') unless type?

  url = [GALAXY_URL, type].join '/'

  request
    .get url
    .set 'Http-Authorization', GALAXY_TOKEN
    .query req.query
    .end (err, response) ->
      return next err if err?
      return next() if response.status isnt 200

      res.send response.body._embedded[type]
