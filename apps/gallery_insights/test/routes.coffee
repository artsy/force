_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
routes = rewire '../routes'
request = require 'superagent'

describe '#index', ->

  beforeEach ->
    @res =
      render: sinon.stub()
      locals:
        sd:
          CURRENT_USER: fabricate 'user', email: 'kana@kana.com'

  it 'sets variable when user is not part of the gallery-insights list', ->
    routes.__set__ 'subscribed', (email, cb) -> cb false
    routes.index {}, @res
    @res.locals.sd.MAILCHIMP_SUBSCRIBED.should.eql 'unsubscribed'

  it 'sets variable when user is part of the gallery-insights list', ->
    routes.__set__ 'subscribed', (email, cb) -> cb true
    routes.index {}, @res
    @res.locals.sd.MAILCHIMP_SUBSCRIBED.should.eql 'subscribed'