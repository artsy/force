_                 = require 'underscore'
benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
PersonalizeState  = require '../../client/state'
CurrentUser       = require '../../../../models/current_user.coffee'
Artist            = require '../../../../models/artist.coffee'
{ fabricate }     = require 'antigravity'
{ resolve }       = require 'path'

mockSuggestionSet = (model) ->
  new Backbone.Model
    id:           model.id
    name:         model.name
    suggestions:  new Backbone.Collection new Artist(fabricate 'artist')

describe 'ArtistsView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$    = $
      @ArtistsView  = benv.requireWithJadeify resolve(__dirname, '../../client/views/artists'), ['template', 'followedTemplate', 'suggestedArtistsTemplate']
      @ArtistsView.__set__ 'SearchBarView', Backbone.View
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @state  = new PersonalizeState
    @user   = new CurrentUser fabricate 'user'
    @view   = new @ArtistsView(state: @state, user: @user)
    @view.render()

  afterEach ->
    Backbone.sync.restore()

  describe '#setupFollowButton', ->
    it 'sets up a FollowButton view that can be accessed later', ->
      artist  = new Artist fabricate 'artist'
      view    = @view.setupFollowButton artist, $('<div></div>')
      view.constructor.name.should.equal 'FollowButton'
      @view.followButtonViews[artist.id].should.equal view

  describe '#setSkipLabel', ->
    it 'sets the label to "next" if we are not quite done; "Done" if we are almost done', ->
      $button = @view.$('.personalize-skip')
      $button.text().should.equal 'Skip'
      @view.state.almostDone().should.not.be.ok
      @view.setSkipLabel()
      $button.text().should.equal 'Next'
      @view._labelSet.should.be.ok
      @view.state.setStep(_.last(@view.state.get('steps')))
      @view.state.almostDone().should.be.ok
      @view.setSkipLabel()
      $button.text().should.equal 'Done'

  describe '#follow', ->
    beforeEach ->
      @artist = new Artist fabricate 'artist'

    it 'sets the skip label (once)', ->
      skipSpy = sinon.spy @view, 'setSkipLabel'
      @view.follow({}, @artist)
      skipSpy.called.should.be.ok
      @view.follow({}, @artist)
      skipSpy.callCount.should.equal 1

    it 'follows the artist', ->
      @view.follow({}, @artist)
      @view.followArtistCollection.get('artists').at(0).id.should.equal @artist.id
      @view.followed.at(0).id.should.equal @artist.id

  describe '#unfollow', ->
    it 'handles the unfollow click', ->
      @view.stopListening @view.followed, 'remove', @view.disposeSuggestionSet
      @view.followed.add fabricate 'artist'
      @view.$('.pfa-remove').click()
      @view.followed.length.should.equal 0
      @view.followArtistCollection.get('artists').length.should.equal 0

  describe '#fetchRelatedArtists', ->
    it 'fetches related artists', ->
      artist        = new Artist(fabricate 'artist')
      suggestions   = [fabricate('artist'), fabricate('artist')]
      sinon.stub(artist, 'fetchRelatedArtists').yieldsTo('success', {}, suggestions)
      @view.fetchRelatedArtists artist
      artist.fetchRelatedArtists.called.should.be.ok
      @view.suggestions.at(0).id.should.equal artist.id
      @view.suggestions.at(0).get('name').should.equal artist.get('name')

  describe '#disposeSuggestionSet', ->
    it 'disposes of the suggestionSet that corresponds with an artist', ->
      model = fabricate 'artist'
      _.isUndefined(@view.followButtonViews).should.be.ok
      @view.suggestions.add mockSuggestionSet(model)
      suggested = @view.suggestions.at(0).get('suggestions').at(0)
      _.isUndefined(@view.followButtonViews[suggested.id]).should.not.be.ok
      @view.disposeSuggestionSet model
      _.isNull(@view.followButtonViews[suggested.id]).should.be.ok

  describe '#renderSuggestions', ->
    it 'renders related artists based on following', ->
      model = fabricate 'artist'
      @view.suggestions.add mockSuggestionSet(model)
      @view.renderSuggestions()
      @view.$el.html().should.include "Artists related to #{@view.suggestions.at(0).get('name')}"
      @view.$('.personalize-suggestion-name').text().should.equal @view.suggestions.at(0).get('suggestions').at(0).get('name')

  describe '#renderFollowed', ->
    it 'renders artists when you follow them', ->
      @view.followed.add fabricate 'artist'
      @view.$('.pfa-name').text().should.equal @view.followed.at(0).get('name')

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.html().should.include 'Follow artists you are interested in'
