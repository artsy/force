benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../../../models/current_user'
EmailPreferencesView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'EmailPreferencesView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user = new CurrentUser fabricate 'user', receive_emails: true
    @view = new EmailPreferencesView model: @user, user: @user
    @view.render()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.data('enabled').should.be.true()
      @view.render().$el.html()
        .should.containEql 'Receive Emails'

  describe '#submit', ->
    it 'saves the preferences', ->
      @view.$('[name="receive_weekly_email"]').click()
      @view.$('[name="receive_weekly_email"]').click()
      @view.$('[name="receive_personalized_email"]').click()
      @view.$('button').click()
      Backbone.sync.args[0][1].attributes
        .receive_personalized_email.should.be.true()
      Backbone.sync.args[0][1].attributes
        .receive_weekly_email.should.be.false()

  describe '#toggleSubscriptions', ->
    it 'disables subscriptions checkboxes when we disable `receive_emails`'

    it 'enables subscriptions checkboxes when we enable `receive_emails`'
