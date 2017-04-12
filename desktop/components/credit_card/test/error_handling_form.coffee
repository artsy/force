benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
sd = require('sharify').data
ErrorHandlingForm = require '../client/error_handling_form.coffee'

describe 'FavoritesStatusModalView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      submit = $('body').html $("<div id='submit'></div>")
      @errorHandlingForm = new ErrorHandlingForm()
      @errorHandlingForm.$submit = submit
      done()

  after ->
    benv.teardown()

  describe '#showError', ->

    afterEach ->
      $('.error').html ''

    it 'handles API param_errors', ->
      @errorHandlingForm.showError 'description', { responseText: "{ \"type\": \"param_error\", \"message\": \"Meow meow meow\" } " }
      $('.error').text().should.equal 'Meow meow meow'

    it 'handles generic API errors', ->
      @errorHandlingForm.showError 'description', { responseText: "{ \"error\": \"This is a boring error message\"}" }
      $('.error').text().should.equal 'This is a boring error message'

    it 'handles API errors', ->
      @errorHandlingForm.showError 'description', { responseText: "{ \"type\": \"payment_error\" }" }
      $('.error').text().should.equal 'Your payment could not be processed. Please try again or contact support.'

    it 'handles 400 errors', ->
      @errorHandlingForm.showError 'description', { status: 400 }
      $('.error').text().should.equal 'Your card appears to be missing or malformed. Please try another card or contact support.'

    it 'handles 401 errors', ->
      @errorHandlingForm.showError 'description', { status: 401 }
      $('.error').text().should.equal 'description'

    it 'handles 402 errors', ->
      @errorHandlingForm.showError 'description', { status: 402 }
      $('.error').text().should.equal 'Your card could not be authorized. Please try another card or contact support.'

    it 'handles 403 errors', ->
      @errorHandlingForm.showError 'description', { status: 403 }
      $('.error').text().should.equal 'Your card appears to be missing or malformed. Please try another card or contact support.'

    it 'handles 404 errors', ->
      @errorHandlingForm.showError 'description', { status: 404 }
      $('.error').text().should.equal 'Registration marketplace invalid.'

    it 'handles non-json responses', ->
      @errorHandlingForm.showError 'description', { responseText: "<html><body>500!</body></html>" }
      $('.error').text().should.equal 'description'

    it 'handles timeouts', ->
      @errorHandlingForm.showError 'description', { statusText: "timeout" }
      $('.error').text().should.containEql 'too long'

    it 'adds stripe errors', ->
      @errorHandlingForm.showError 'description', { status: 400, error: { additional: 'additional info'} }
      $('.error').text().should.equal 'Your card appears to be missing or malformed. Please try another card or contact support. additional info'

    it 'handles errors that are a function', ->
      animal = 'jackal'
      @errorHandlingForm.showError () -> "Expected a breed of dog, you gave #{animal}"
      $('.error').text().should.equal 'Expected a breed of dog, you gave jackal'
