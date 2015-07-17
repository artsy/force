benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
Profile = require '../../../../models/profile.coffee'
UserEdit = require '../../models/user_edit.coffee'
CurrentUser = require '../../../../models/current_user'
CollectorForm = benv.requireWithJadeify require.resolve('../../client/collector_form.coffee'), ['template']
CollectorForm.__set__ 'LocationSearchView', Backbone.View
UserInterestsView = benv.requireWithJadeify require.resolve('../../../../components/user_interests/view'), [
  'template'
  'collectionTemplate'
]
UserInterestsView::postRender = -> #
CollectorForm.__set__ 'UserInterestsView', UserInterestsView

describe 'CollectorForm', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user = new CurrentUser fabricate 'user'
    @userEdit = new UserEdit fabricate 'user'
    @view = new CollectorForm userEdit: @userEdit, user: @user
    @view.render()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the view', ->
      @view.$el.html().should.containEql 'About You'

  describe 'introduction', ->
    beforeEach ->
      sinon.stub @view, 'syncIntroduction'

    afterEach ->
      @view.syncIntroduction.restore()

    it 'syncs when a userInterest is destroyed', ->
      userInterest = new Backbone.Model
      @view.userInterestsView.collection.trigger 'remove', userInterest
      @view.syncIntroduction.callCount.should.equal 0
      userInterest.trigger 'sync'
      @view.syncIntroduction.callCount.should.equal 1
