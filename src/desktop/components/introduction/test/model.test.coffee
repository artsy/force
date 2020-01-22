_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
Introduction = require '../model'
LoggedOutUser = require '../../../models/logged_out_user'
Artist = require '../../../models/artist'
UserInterests = require '../../../collections/user_interests'

describe 'Introduction', ->
  beforeEach ->
    sinon.stub(Backbone, 'sync').yieldsTo 'success'

  afterEach ->
    Backbone.sync.restore()

  describe '#generate', ->
    beforeEach ->
      @user = new LoggedOutUser fabricate 'user'

    it 'accepts a success callback', (done) ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success'
      introduction = new Introduction
      introduction.generate @user, null, null, success: -> done()

    it 'accepts an error callback', (done) ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'error'
      introduction = new Introduction
      introduction.generate @user, null, null, error: -> done()

    describe 'with userInterests', ->
      beforeEach ->
        @userInterests = new UserInterests
        _.times 5, => @userInterests.addInterest(new Artist fabricate 'artist')

      it 'makes an introduction request for logged out users', ->
        introduction = new Introduction
        introduction.generate @user, @userInterests
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][1].attributes.should.eql
          name: 'Craig Spaeth'
          profession: 'engineer'
          collector_level: '5'
          collection: ['Pablo Picasso', 'Pablo Picasso', 'Pablo Picasso', 'Pablo Picasso', 'Pablo Picasso']

    describe 'with user location (and no userInterests)', ->
      beforeEach ->
        @user.set location: city: 'New York', country: 'United States'

      it 'makes an introduction request for logged out users', ->
        introduction = new Introduction
        introduction.generate @user, null
        Backbone.sync.args[0][1].attributes.should.eql
          name: 'Craig Spaeth',
          profession: 'engineer'
          collector_level: '5'
          location:
            city: 'New York'
            country: 'United States'
            raw: ''
            address: ''
            address_2: ''
            state: ''
            state_code: ''
            postal_code: ''
            coordinates: null
            summary: ''

    describe 'with attendance', ->
      beforeEach ->
        @attendance = new Backbone.Model name: 'The Armory Show'

      it 'makes an introduction request for logged out users', ->
        introduction = new Introduction
        introduction.generate @user, null, @attendance
        Backbone.sync.args[0][1].attributes.should.eql
          name: 'Craig Spaeth'
          profession: 'engineer'
          collector_level: '5'
          attending: 'The Armory Show'
