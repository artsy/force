_                 = require 'underscore'
benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
PersonalizeState  = require '../../client/state'
CurrentUser       = require '../../../../models/current_user'
Items             = require '../../../../collections/items'
Profile           = require '../../../../models/profile'
{ fabricate }     = require 'antigravity'
{ resolve }       = require 'path'
SuggestionsView   = benv.requireWithJadeify resolve(__dirname, '../../client/views/suggestions'), ['suggestedTemplate']
Followable        = require '../../client/mixins/followable'

module.exports = class TestView extends SuggestionsView
  _.extend @prototype, Followable

  template: ->
    '<div id="personalize-suggestions-container"><div class="personalize-skip">Skip</div></div>'

  key:          'personalize:suggested-galleries'
  restrictType: 'PartnerGallery'


describe 'SuggestionsView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @state  = new PersonalizeState
    @user   = new CurrentUser fabricate 'user'
    @view   = new TestView(state: @state, user: @user, followKind: 'artist')

    # Setup suggestions
    @view.$suggestions = $('<div id="personalize-suggestions"></div>')
    items   = _.times 4, ->
      profile     = new Profile(fabricate 'profile')
      profile.id  = _.uniqueId(profile.id)
      profile

    items = new Items items, { id: 'foobar', item_type: 'Profile' }
    @view.suggestedSets.add new Backbone.Model { key: @view.key, items: items }

    @view.render()

  describe '#rows', ->
    it 'slices suggestions into a multi-dimensional array, each of n length', ->
      @view.suggestedSets.trigger 'sync:complete'
      @view.suggestions.length
      rows = @view.rows 2
      rows.length.should.equal 2
      rows[0].length.should.equal 2
      rows[1].length.should.equal 2

  describe '#setupSuggestions', ->
    beforeEach ->
      @view.suggestedSets.trigger 'sync:complete'
      @renderSpy          = sinon.spy @view, 'renderSuggestions'
      @_length            = @view.suggestions._events.sync.length
      @view.$suggestions  = { append: sinon.stub(), find: sinon.stub() }
      @view.setupSuggestions()

    afterEach ->
      @view.stopListening @view.suggestions, 'sync'
      @view.renderSuggestions.restore()

    it 'sets the data state of the container to loaded', ->
      @view.$('#personalize-suggestions-container').data('state').should.equal 'loaded'

    it 'assigns suggestions', ->
      @view.suggestions.length.should.be.ok

    it 'adds a listener for the sync event', ->
      @view.suggestions._events.sync.length.should.equal @_length + 1

    it 'renders the suggestions', ->
      @renderSpy.called.should.be.ok

  describe '#renderSuggestions', ->
    it 'renders the suggestions', ->
      @view.suggestedSets.trigger 'sync:complete'
      @view.$suggestions.find('.personalize-suggestion-row').length.should.equal 1
      @view.$suggestions.find('.personalize-suggestion.is-profile').length.should.equal 4
      @view.suggestedSets.trigger 'sync:complete'
      @view.$suggestions.find('.personalize-suggestion-row').length.should.equal 2
      @view.$suggestions.find('.personalize-suggestion.is-profile').length.should.equal 8

    it 'syncs the new ids with the following', ->
      syncSpy = sinon.spy @view.following, 'syncFollows'
      @view.suggestedSets.trigger 'sync:complete'
      syncSpy.args[0][0].should.eql @view.suggestions.pluck('id')
      @view.following.syncFollows.restore()

    it 'should be able to find corresponding els', ->
      @view.suggestedSets.trigger 'sync:complete'
      lengths = @view.suggestions.map (model) =>
        @view.$suggestions.find(".follow-button[data-id='#{model.id}']").length
      _.each lengths, (length) -> length.should.be.ok

    it 'creates corresponding FollowButton views', ->
      @view.suggestedSets.trigger 'sync:complete'
      views = @view.suggestions.map (model) =>
        @view.followButtonViews[model.id].constructor.name
      views.length.should.equal @view.suggestions.length
      _.uniq(views)[0].should.equal 'FollowButton'

    it 'sets up a listener for setting the skip label', ->
      @view.suggestedSets.trigger 'sync:complete'
      @view.__labelSet__?.should.not.be.ok
      @view.$('.personalize-skip').text().should.equal 'Skip'
      @view.$suggestions.find('.follow-button').first().click()
      @view.__labelSet__.should.be.ok
      @view.$('.personalize-skip').text().should.equal 'Next'

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.html().should.include @view.template()
