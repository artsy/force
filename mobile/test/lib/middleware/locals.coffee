Backbone = require 'backbone'
sinon = require 'sinon'
middleware = require '../../../lib/middleware/locals'

describe 'locals middleware', ->

  it 'adds a session id', ->
    middleware req = { session: {} }, res = { locals: { sd: {} } }, ->
    req.session.id.length.should.be.above 0
    res.locals.sd.SESSION_ID.should.equal req.session.id

  it 'adds a user agent', ->
    middleware req = { headers: { 'user-agent': 'Artsy-Mobile' }, session: {} },
      res = { locals: { sd: {} } }, ->
    res.locals.sd.USER_AGENT.should.equal 'Artsy-Mobile'

describe 'html class generated from user agent', ->

  it 'notices the artsy mobile app', ->
    middleware req = { headers: { 'user-agent': 'Artsy-Mobile' }, session: {} },
      res = { locals: { sd: {} } }, ->
    res.locals.htmlClass.should.equal 'layout-artsy-mobile-app'

  it 'notices logged in users', ->
    middleware req = { user: new Backbone.Model(accessToken: 'x-foobar') },
      res = { locals: { sd: {} } }, ->
    res.locals.htmlClass.should.containEql 'layout-logged-in'
