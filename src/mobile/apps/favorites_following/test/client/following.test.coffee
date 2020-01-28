_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
{ resolve } = require 'path'
FollowingView = benv.requireWithJadeify resolve(__dirname, '../../client/following'),
  ['profilesTemplate']

describe 'Follows client-side code', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.onInfiniteScroll = ->
      benv.render resolve(__dirname, '../../templates/index.jade'), { sd: {} }, =>
        @profiles = -> _.times 5, -> { profile: fabricate 'profile', id: _.uniqueId() }
        sinon.stub(Backbone, 'sync').yieldsTo 'success', @profiles()
        @view = new FollowingView el: $('body')
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  it 'fetches the following profiles and renders them immediately', ->
    @view.$list.length.should.equal 1
    @view.$('.profile-item').length.should.equal 5

  it 'appends new profiles once they are fetched', ->
    @view.following.fetch()
    @view.$list.length.should.equal 1
    @view.$('.profile-item').length.should.equal 10
