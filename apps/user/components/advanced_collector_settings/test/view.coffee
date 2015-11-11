benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
UserEdit = require '../../../models/user_edit'
AdvancedCollectorSettingsFormView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'AdvancedCollectorSettingsFormView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user = new UserEdit fabricate 'user'
    @view = new AdvancedCollectorSettingsFormView model: @user

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders correctly', ->
      html = @view.render().$el.html()
      html.should.containEql 'Add artists, categories, and galleries you follow to inquiries'

  describe '#submit', ->
    it 'saves the attributes on the user', ->
      @view.render()

      @view.$('[name="share_follows"]').click()
      @view.$('button').click()
      Backbone.sync.args[0][1].attributes.share_follows.should.be.true()

      @view.$('[name="share_follows"]').click()
      @view.$('button').click()
      Backbone.sync.args[1][1].attributes.share_follows.should.be.false()
