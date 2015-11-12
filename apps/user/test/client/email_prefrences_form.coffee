_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../models/current_user'
EmailPreferencesForm = rewire '../../client/email_prefrences_form'

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

describe 'EmailPreferencesForm', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub(EmailPreferencesForm::, 'validateForm').returns true
    sinon.stub(EmailPreferencesForm::, 'formIsSubmitting').returns false
    sinon.stub Backbone, 'sync'
    sinon.spy $.fn, 'prop'

    @user = new CurrentUser fabricate 'user'
    @model = new Backbone.Model
    @model.url = '/api/v1/fixture'
    @view = new EmailPreferencesForm el: $(formTemplate), model: @model, user: @user

    done()

  afterEach ->
    @view.validateForm.restore()
    @view.formIsSubmitting.restore()
    $.fn.prop.restore()
    Backbone.sync.restore()

  describe '#receive_emails', ->
    beforeEach ->
      @view.$('input[name="baz"]').prop('checked', true)
      @view.$('input[name="bar"]').prop('checked', false)
      @propCalled = (selector, attr, val)->
        for thisValue, i in $.fn.prop.thisValues
          arg = $.fn.prop.args[i] if thisValue.selector is selector
        arg[0].should.equal attr
        arg[1].should.equal val

    it 'disables email_subscriptions checkboxes when we disable receive_emails', ->
      @view.$('#receive_emails').prop('checked', true)
      @view.$('#receive_emails').click()
      @propCalled '.email_subscriptions input', 'disabled', false
      @propCalled 'input[name="bar"]', 'checked', false
      @propCalled 'input[name="baz"]', 'checked', true

    it 'emables email_subscriptions checkboxes when we enable receive_emails', ->
      @view.$('#receive_emails').prop('checked', false)
      @view.$('#receive_emails').click()
      @propCalled '.email_subscriptions input', 'disabled', true
      @propCalled 'input[name="bar"]', 'checked', false
      @propCalled 'input[name="baz"]', 'checked', true
