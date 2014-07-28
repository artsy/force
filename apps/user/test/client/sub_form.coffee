_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../models/current_user'
SubForm = rewire '../../client/sub_form'

formTemplate = """
  <div>
    <div class='settings-form-errors'></div>
    <form>
      <input type='text' name='foo'>
      <input type='text' name='bar'>
      <button>Submit</button>
    </form>
  </div>
"""

describe 'SubForm', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub(SubForm::, 'validateForm').returns true
    sinon.stub(SubForm::, 'formIsSubmitting').returns false
    sinon.stub Backbone, 'sync'

    @user = new CurrentUser fabricate 'user'
    @model = new Backbone.Model
    @model.url = '/api/v1/fixture'
    @view = new SubForm el: $(formTemplate), model: @model, user: @user

    done()

  afterEach ->
    @view.validateForm.restore()
    @view.formIsSubmitting.restore()
    Backbone.sync.restore()

  describe '#submit', ->
    beforeEach ->
      @view.$('input[name="foo"]').val 'Foo'
      @view.$('input[name="bar"]').val 'Bar'
      @view.$button.click()

    it 'sets the loading button state', ->
      @view.$button.attr('data-state').should.equal 'loading'

    it 'submits the form', ->
      Backbone.sync.called.should.be.true
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][1].url.should.equal '/api/v1/fixture'
      Backbone.sync.args[0][1].attributes.should.eql foo: 'Foo', bar: 'Bar'

    describe '#submitSuccess', ->
      beforeEach ->
        @view.$errors.text 'Existy'
        Backbone.sync.restore()
        sinon.stub(Backbone, 'sync').yieldsTo 'success'
        @view.$button.click()

      it 'reenables the form', ->
        _.isUndefined(@view.$button.attr 'data-state').should.be.true

      it 'refreshes the user', ->
        Backbone.sync.callCount.should.equal 2
        _.last(Backbone.sync.args)[1].url().should.containEql '/api/v1/me'

      it 'clears the error messages', ->
        @view.$errors.text().should.equal ''

    describe '#submitError', ->
      beforeEach ->
        Backbone.sync.restore()
        sinon.stub(Backbone, 'sync').yieldsTo 'error'
        @view.$button.click()

      it 'sets the button state to error', ->
        @view.$button.attr('data-state').should.equal 'error'

      it 'renders an error', ->
        @view.$errors.text().should.equal 'There was an error'
