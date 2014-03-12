_       = require 'underscore'
benv    = require 'benv'
Cookie  = require '../cookie'

describe 'Cookie', ->
  before (done) ->
    benv.setup =>
      done()

  after ->
    benv.teardown()

  describe '#createCookie, #readCookie', ->
    it 'creates a cookie', ->
      Cookie.createCookie 'name', 'value'
      Cookie.readCookie('name').should.equal 'value'

  describe '#readCookie', ->
    it 'reads a cookie', ->
      Cookie.readCookie('name').should.equal 'value'
      _.isUndefined(Cookie.readCookie 'foobar').should.be.ok

  describe '#deleteCookie', ->
    it 'deletes a cookie', ->
      Cookie.createCookie 'name', 'value'
      Cookie.deleteCookie('name')
      Cookie.readCookie('name').should.equal ''
