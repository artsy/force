_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Form = require '../form.coffee'
errorResponses = require './error_responses'

class FormView extends Backbone.View
  _.extend @prototype, Form

  events:
    'submit form': 'submit'

  template: ->
    """
      <form>
        <input name='name'>
        <input name='email' required>
        <textarea name='comment' required></textarea>
        <input name='yes' type='checkbox' checked>
        <input name='no' type='checkbox'>
        <button>Submit</button>
      </form>
    """

  submitStub: -> # Stubbed in beforeEach hook
  submit: ->
    return if @formIsSubmitting()
    @submitStub()

  render: ->
    @$el.html @template()
    this

describe 'Form', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @view = new FormView().render()
      sinon.stub FormView::, 'submitStub'
      done()

  afterEach ->
    @view.submitStub.restore()
    benv.teardown()

  describe '#formIsSubmitting', ->
    it 'returns false the first time it is called, true every time after', ->
      @view.formIsSubmitting().should.be.false
      @view.formIsSubmitting().should.be.true
      @view.formIsSubmitting().should.be.true
      @view.formIsSubmitting().should.be.true

    it 'disables the button', ->
      @view.formIsSubmitting()
      @view.$('button').prop('disabled').should.be.true

    it 'should work with an actual form submission', ->
      @view.submitStub.called.should.be.false
      @view.$('form').submit()
      @view.submitStub.called.should.be.true
      @view.$('form').submit()
      @view.$('form').submit()
      @view.submitStub.callCount.should.equal 1

  describe '#reenableForm', ->
    it 'reenables the form', ->
      @view.formIsSubmitting().should.be.false
      @view.formIsSubmitting().should.be.true
      @view.reenableForm()
      @view.formIsSubmitting().should.be.false
      @view.formIsSubmitting().should.be.true

    it 'removes the disabled attr from the button', ->
      @view.formIsSubmitting()
      @view.$('button').prop('disabled').should.be.true
      @view.reenableForm()
      @view.$('button').prop('disabled').should.be.false

  describe '#serializeForm', ->
    it 'should return all named inputs as keys regardless of values', ->
      @view.serializeForm().should.have.keys 'name', 'email', 'comment', 'yes', 'no'

    it 'should return all values corresponding to keys', ->
      values = { name: 'Foo Bar', email: 'foo@bar.com', comment: 'Baz Qux Whatever', yes: true, no: false }
      @view.$('form').find('input[name=name]').val values['name']
      @view.$('form').find('input[name=email]').val values['email']
      @view.$('form').find('textarea[name=comment]').val values['comment']
      @view.serializeForm().should.containEql values

    it 'should work with an actual form submission', ->
      @view.$('form').submit()
      @view.reenableForm()
      @view.$('form').submit()
      @view.$('form').submit()
      @view.submitStub.callCount.should.equal 2

  describe '#validateForm', ->
    # Note: https://github.com/tmpvar/jsdom/issues/544
    it 'should set a class on the form and call the #checkValidity on the form', ->
      @view.$('form')[0].checkValidity = sinon.stub()
      @view.validateForm()
      @view.$('form').hasClass('is-validated').should.be.ok
      @view.$('form')[0].checkValidity.called.should.be.ok

  describe '#errorMessage', ->
    _.each errorResponses, (responseObj) ->
      it 'should handle a real world error response', ->
        @view.errorMessage({ responseText: responseObj.error }).should.equal responseObj.message

    it 'should set the error state on inputs when there is a param_error', ->
      @view.errorMessage({ responseText: errorResponses[0].error })
      @view.$('input[name=email]').data('state').should.equal 'error'
