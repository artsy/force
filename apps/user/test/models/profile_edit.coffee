_           = require 'underscore'
Backbone    = require 'backbone'
ProfileEdit = require '../../models/profile_edit.coffee'
fabricate   = require('antigravity').fabricate

describe 'ProfileEdit', ->

  beforeEach ->
    require('sharify').data.ARTSY_URL = 'http://localhost:5000'
    @profileEdit = new ProfileEdit fabricate 'profile', { _id: "1234567890987654321" }

  describe '#url', ->

    it 'should use the _id the parent url', ->
      @profileEdit.url().should.include "/profile/#{@profileEdit.get('_id')}"


  describe "#validate (client validation)", ->

    beforeEach ->
      @values = {}

    it 'ensures that the profile handle (id) is at least three chars long', ->
      @values.id = '12'
      @profileEdit.validate(@values).handle.should.equal @profileEdit.errorMessages.id_min
      @values.id = '123'
      _.isUndefined(@profileEdit.validate(@values)).should.be.true

    it 'ensures the handle only contains numbers, letter, _, and -', ->
      @values.id = '?1=2&'
      @profileEdit.validate(@values).handle.should.equal @profileEdit.errorMessages.id_invalid
      @values.id = '123'
      _.isUndefined(@profileEdit.validate(@values)).should.be.true


  describe '#onOffPublic', ->

    it 'returns on or off if the profile is public', ->
      @profileEdit.onOffPublic().should.equal 'on'
      @profileEdit.set private: true
      @profileEdit.onOffPublic().should.equal 'off'

  describe '#onOffFavorites', ->

    it "returns on or off if the user's favorite artworks are public", ->
      privateFavs = new Backbone.Model { private: true }
      publicFavs = new Backbone.Model { private: false }
      @profileEdit.onOffFavorites(privateFavs).should.equal 'off'
      @profileEdit.onOffFavorites(publicFavs).should.equal 'on'
