_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Validator = require '../validator'
{ template, confirmables } = require './fixture'

describe 'Validator', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @$form = $(template).prepend confirmables
    @validator = new Validator $form: @$form

  describe '#valid', ->
    # Note: https://github.com/tmpvar/jsdom/issues/544
    it 'should set a class on the form and call `checkValidity`', ->
      @$form[0].checkValidity = sinon.stub()
      @validator.isValid()
      @$form.hasClass('is-validated').should.be.true()
      @$form[0].checkValidity.called.should.be.true()

    describe 'with confirmable fields', ->
      beforeEach ->
        @$form[0].checkValidity = sinon.stub()

      it 'should check for confirmable fields and validate they match', ->
        @$form.find('input[name="password"]').val 'foo'
        @$form.find('input[name="password_confirmation"]').val 'bar'
        @$form.find('input[name="password_confirmation"]')[0].setCustomValidity = sinon.stub()
        @validator.isValid()
        @$form.find('input[name="password_confirmation"]')[0].setCustomValidity.called.should.be.true()
        @$form.find('input[name="password_confirmation"]')[0].setCustomValidity.args[0][0].should.equal 'Password must match'
        # Resolve the validation
        @$form.find('input[name="password_confirmation"]').val 'foo'
        @validator.isValid()
        # Empty string clears the custom validation
        _.last(@$form.find('input[name="password_confirmation"]')[0].setCustomValidity.args)[0].should.equal ''
