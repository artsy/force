_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
LoggedOutUser = require '../../../models/logged_out_user'
Bookmarks = require '../../bookmarks/collection'
Introduction = require '../introduction'

describe 'Introduction', ->
  beforeEach ->
    @user = new LoggedOutUser name: 'damon zucconi'
    @bookmarks = new Bookmarks
    @introduction = new Introduction @user, @bookmarks

  describe 'logged out', ->
    it 'returns undefined if there is no data', ->
      _.isUndefined(@introduction.blurb()).should.be.true

    it 'denotes the user as a collector', ->
      @user.set 'collector_level', 3
      @introduction.blurb().should.equal 'Damon is a collector.'

    it 'displays the user location', ->
      @user.set 'location', city: 'New York'
      @introduction.blurb().should.equal 'Damon is based in New York.'

    it 'displays both collector and location', ->
      @user.set 'collector_level', 3
      @user.set 'location', city: 'New York'
      @introduction.blurb().should.equal 'Damon is a collector based in New York.'

    it 'displays the users collection if present', ->
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Foo Bar')
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Bar Baz')
      @introduction.blurb().should.equal 'Damon’s collection includes Bar Baz and Foo Bar.'

  describe 'logged in', ->
    beforeEach ->
      @user = new LoggedOutUser id: 'dzuc', name: 'Damon', created_at: '2012-03-27T14:11:24Z'
      @bookmarks = new Bookmarks
      @introduction = new Introduction @user, @bookmarks

    it 'displays the bare minimum of information when the user is logged in', ->
      @introduction.blurb().should.equal 'Damon has been an Artsy member since March 2012.'

    it 'does not say the user is a collector if they have a collector level of 2 or below', ->
      @user.set 'collector_level', 2
      @introduction.blurb().should.not.include 'is a collector'

    it 'denotes the user as a collector if they have a collector level of 3 or above', ->
      @user.set 'collector_level', 3
      @introduction.blurb().should.equal 'Damon is a collector and has been an Artsy member since March 2012.'

    it 'displays the user location if they have one', ->
      @user.set 'location', city: 'New York'
      @introduction.blurb().should.equal 'Damon is based in New York and has been an Artsy member since March 2012.'

    it 'renders a grammatically correct sentence if the user is a collector and has a location', ->
      @user.set 'collector_level', 3
      @user.set 'location', city: 'New York'
      @introduction.blurb().should.equal 'Damon is a collector based in New York and has been an Artsy member since March 2012.'

    it 'displays the user collection if they have any', ->
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Foo Bar')
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Bar Baz')
      @introduction.blurb().should.equal 'Damon has been an Artsy member since March 2012. Damon’s collection includes Bar Baz and Foo Bar.'

    it 'displays the user profession if present', ->
      @user.set 'profession', 'Engineer @ Artsy'
      @introduction.blurb().should.equal 'Damon has been an Artsy member since March 2012. Damon’s profession is noted as “Engineer @ Artsy.”'

    it 'deals with blank strings in the profession field', ->
      @user.set 'profession', ''
      @introduction.blurb().should.equal 'Damon has been an Artsy member since March 2012.'

    it 'renders the correct string if the user has more than 3 artists in their collection (1)', ->
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Foo Bar')
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Bar Baz')
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Baz Qux')
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Qux Whatever')
      @introduction.blurb().should
        .equal 'Damon has been an Artsy member since March 2012. Damon’s collection includes Qux Whatever, Baz Qux, Bar Baz and 1 other artist.'

    it 'renders the correct string if the user has more than 3 artists in their collection (2)', ->
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Foo Bar')
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Bar Baz')
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Baz Qux')
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Qux Whatever')
      @bookmarks.newFromArtist new Backbone.Model(fabricate 'artist', name: 'Whatever Whatever')
      @introduction.blurb().should
        .equal 'Damon has been an Artsy member since March 2012. Damon’s collection includes Whatever Whatever, Qux Whatever, Baz Qux and 2 other artists.'

  describe 'without bookmarks', ->
    beforeEach ->
      @introduction = new Introduction @user

    it 'returns undefined if there is no data', ->
      _.isUndefined(@introduction.blurb()).should.be.true

    it 'denotes the user as a collector', ->
      @user.set 'collector_level', 3
      @introduction.blurb().should.equal 'Damon is a collector.'

    it 'displays the user location', ->
      @user.set 'location', city: 'New York'
      @introduction.blurb().should.equal 'Damon is based in New York.'
