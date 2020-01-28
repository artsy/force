benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../../../models/current_user'
AdvancedCollectorSettingsFormView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'AdvancedCollectorSettingsFormView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user = new CurrentUser fabricate 'user'
    @view = new AdvancedCollectorSettingsFormView model: @user

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders correctly', ->
      html = @view.render().$el.html()
      html.should.containEql 'Share followed artists, categories, and galleries with your inquiries'

  describe '#submit', ->
    it 'saves the attributes on the user', ->
      @view.render()

      @view.$('[name="share_follows"]').click()
      @view.$('button').click()
      Backbone.sync.args[0][1].attributes.share_follows.should.be.true()

      @view.$('[name="share_follows"]').click()
      @view.$('button').click()
      Backbone.sync.args[1][1].attributes.share_follows.should.be.false()
