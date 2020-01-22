benv = require 'benv'
_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
Profile = require '../../../models/profile.coffee'
Artist = require '../../../models/artist.coffee'
rewire = require 'rewire'
FollowButton = rewire '../view.coffee'
{ fabricate } = require '@artsy/antigravity'
Following = require '../collection'

describe 'FollowButton', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        sd: {}
      sinon.stub Backbone, 'sync'
      FollowButton.__set__ 'mediator', @mediator = trigger: sinon.stub()
      FollowButton.__set__ 'ArtistSuggestions', @artistSuggestionSpy = sinon.spy()
      Backbone.$ = $
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe 'initializing artist suggestions', ->
    before ->
      @following = new Following null, kind: 'profile'
      @view = new FollowButton
        el: $("<div></div>")
        model: new Artist(fabricate 'artist')
        modelName: 'artist'
        following: @following

    it 'initializes the suggestions view for an artist context with a following (logged-in) collection', ->
      @artistSuggestionSpy.called.should.be.ok()

  describe '#toggle without label', ->
    before ->
      @view = new FollowButton
        el: $("<div></div>")
        model: new Profile(fabricate 'fair_profile')
        modelName: 'profile'

    it 'triggers an auth modal with the model name as the label', ->
      @view.$el.click()
      _.last(@mediator.trigger.args)[1].copy.should.equal 'Sign up to follow profiles'

  describe '#toggle with label', ->
    before ->
      @view = new FollowButton
        el: $("<div></div>")
        model: new Profile(fabricate 'fair_profile')
        modelName: 'profile'
        label: 'The Armory Show'

    it 'triggers an auth modal with the passed in label', ->
      @view.$el.click()
      _.last(@mediator.trigger.args)[1].copy.should.equal 'Sign up to follow The Armory Show'
