sinon = require 'sinon'
express = require 'express'
artsyXappMiddleware = require '../'
request = require 'superagent'
moment = require 'moment'

# Fake Artsy server
artsy = express()
artsy.get '/api/v1/xapp_token', (req, res, next) ->
  res.send { xapp_token: 'x-foo-token', expires_in: moment().add('seconds', 2).format() }

# App server
app = express()
app.use artsyXappMiddleware
  artsyUrl: 'http://localhost:5000'
  clientId: 'fooid'
  clientSecret: 'foosecret'
app.get '/foo', (req, res) ->
  res.send res.locals.artsyXappToken

describe 'artsyXappMiddleware', ->

  artsy.listen 5000
  app.listen 4000


  it 'fetches an xapp token and stores it in the request', (done) ->
    request('http://localhost:4000/foo').end (res) ->
      res.text.should.equal 'x-foo-token'
      done()

  it 'injects the cached token on subsequent requests', (done) ->
    request('http://localhost:4000/foo').end (res) ->
      res.text.should.equal 'x-foo-token'
      done()

  it 'expires the token after the expiration time', (done) ->
    token = artsyXappMiddleware.token
    request('http://localhost:4000/foo').end (res) ->
      res.text.should.equal 'x-foo-token'
      setTimeout ->
        (token?).should.not.be.ok
        done()
      , 2000