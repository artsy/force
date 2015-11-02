_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../models/current_user'
EmailPrefrencesForm = rewire '../../client/email_prefrences_form'

formTemplate = """
  <div>
    <div class='settings-form-errors'></div>
    <form>
      <input type='checkbox' name='foo' id='receive_emails'>
      <div class='email_subscriptions'>
        <input type='checkbox' name='bar'>
        <input type='checkbox' name='baz'>
      </div>
      <button>Submit</button>
    </form>
  </div>
"""

describe 'EmailPrefrencesForm', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub(EmailPrefrencesForm::, 'validateForm').returns true
    sinon.stub(EmailPrefrencesForm::, 'formIsSubmitting').returns false
    sinon.stub Backbone, 'sync'

    @user = new CurrentUser fabricate 'user'
    @model = new Backbone.Model
    @model.url = '/api/v1/fixture'
    @view = new EmailPrefrencesForm el: $(formTemplate), model: @model, user: @user

    done()

  afterEach ->
    @view.validateForm.restore()
    @view.formIsSubmitting.restore()
    Backbone.sync.restore()

  describe '#receive_emails', ->
    beforeEach ->
      @view.$('input[name="bar"]').prop('checked', false)
      @view.$('input[name="baz"]').prop('checked', true)

    it 'disables email_subscriptions checkboxes when we disable receive_emails', ->
      @view.$('#receive_emails').prop('checked', true)
      @view.$('#receive_emails').click()
      @view.$('.email_subscriptions input').prop('disabled').should.be.true()
      @view.$('input[name="bar"]').is(':checked').should.be.false()
      @view.$('input[name="baz"]').is(':checked').should.be.true()

    it 'emables email_subscriptions checkboxes when we enable receive_emails', ->
      @view.$('#receive_emails').prop('checked', false)
      @view.$('#receive_emails').click()
      @view.$('.email_subscriptions input').prop('disabled').should.be.false()
      @view.$('input[name="bar"]').is(':checked').should.be.false()
      @view.$('input[name="baz"]').is(':checked').should.be.true()
