_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Errors = require '../errors'
{ template, errors } = require './fixture'

describe 'Errors', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @$form = $(template)
    @errors = new Errors @$form

  describe '#parse', ->
    _.each errors, (response) ->
      it 'should handle a real world error response', ->
        @errors.parse(responseText: response.error).should.equal response.message

    it 'should set the error state on inputs when there is a param_error', ->
      @errors.parse(responseText: errors[0].error)
      @$form.find('input[name=email]').data('state').should.equal 'error'
