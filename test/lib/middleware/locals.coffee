Backbone = require 'backbone'
sinon = require 'sinon'
middleware = require '../../../lib/middleware/locals'

describe 'locals middleware', ->

  it 'adds a session id', ->
    middleware req = { session: {}, get: (->)}, res = { locals: { sd: { ASSET_PATH: '' } } }, ->
    req.session.id.length.should.be.above 0
    res.locals.sd.SESSION_ID.should.equal req.session.id

  it 'sets the hide header flag', ->
    middleware req = { cookies: { 'hide-force-header': true }, session: {}, get: (->)}, res = { locals: { sd: { ASSET_PATH: '' } } }, ->
    res.locals.sd.HIDE_HEADER.should.be.ok
