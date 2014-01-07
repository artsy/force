_               = require 'underscore'
benv            = require 'benv'
Form            = require '../form.coffee'
Backbone        = require 'backbone'
errorResponses  = require './error_responses'

class FormView extends Backbone.View
  _.extend @prototype, Form

  template: ->
    """
      <form>
        <input name='name'>
        <input name='email' required>
        <textarea name='comment' required></textarea>
      </form>
    """

  render: ->
    @$el.html @template()
    this

describe 'Form', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$ = $
      @view = new FormView().render()
      done()

  afterEach ->
    benv.teardown()

  describe '#serializeForm', ->
    it 'should return all named inputs as keys regardless of values', ->
      @view.serializeForm().should.have.keys 'name', 'email', 'comment'

    it 'should return all values corresponding to keys', ->
      values = { name: 'Foo Bar', email: 'foo@bar.com', comment: 'Baz Qux Whatever' }
      @view.$('form').find('input[name=name]').val values['name']
      @view.$('form').find('input[name=email]').val values['email']
      @view.$('form').find('textarea[name=comment]').val values['comment']
      @view.serializeForm().should.include values

  describe '#validateForm', ->
    it 'should check all required fields and set their state to error if they are empty', ->
      @view.validateForm()
      @view.$('form').find(':input[required]').each ->
        $(this).data('state').should.equal 'error'

  describe '#errorMessage', ->
    _.each errorResponses, (responseObj) ->
      it 'should handle a real world error response', ->
        @view.errorMessage({ responseText: responseObj.error }).should.equal responseObj.message

    it 'should set the error state on inputs when there is a param_error', ->
      @view.errorMessage({ responseText: errorResponses[0].error })
      @view.$('input[name=email]').data('state').should.equal 'error'
