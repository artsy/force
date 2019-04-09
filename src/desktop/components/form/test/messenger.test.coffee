benv = require 'benv'
sinon = require 'sinon'
Messenger = require '../messenger'
{ template } = require './fixture'

describe 'Messenger', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $('body').html template
    @messenger = new Messenger
      $form: @$form = $('form')
      $errors: @$errors = @$form.find('.js-form-errors')

  describe '#custom', ->
    beforeEach ->
      @el = @$form.find('[name="email"]')[0]

    it 'handles a `valueMissing` validity state', ->
      @el.validity = valueMissing: true
      @messenger.custom @el
        .should.equal 'Please enter your email'

    it 'handles a `patternMismatch` validity state', ->
      @el.validity = patternMismatch: true
      @messenger.custom @el
        .should.equal 'Please match the requested format'

    it 'handles a `typeMismatch` validity state', ->
      @el.validity = typeMismatch: true
      @messenger.custom @el
        .should.equal 'Please enter a valid email'

  describe '#fallback', ->
    it 'kills the trailing period', ->
      @messenger.fallback validationMessage: 'Please fill out this field.'
        .should.equal 'Please fill out this field'

    it 'humanizes the message', ->
      @messenger.fallback validationMessage: 'type_mismatch'
        .should.equal 'Type mismatch'

  describe '#message', ->
    it 'constructs a complete validation feedback message', ->
      el = @$form.find('[name="name"]')[0]
      el.validity = valueMissing: true
      @messenger.message el
        .should.equal 'Please enter your name: (6 characters minimum)'

    it 'falls back if there is no custom error', ->
      el = $('<div></div>')[0]
      el.validity = fooBar: true
      el.validationMessage = 'A fallback message.'
      @messenger.message el
        .should.equal 'A fallback message.'

  describe '#render', ->
    beforeEach ->
      $fields = @$form.find 'input, textarea'

      $.extend $.expr[':'], valid: (el) -> $fields.has el

      $fields.each ->
          $(this)[0].validity = {}

      ($invalids = $fields.filter '[required]')
        .each ->
          $(this)[0].validity = valueMissing: true

      $invalids.add $name = $fields.filter '[name="name"]'
      $name[0].validity = patternMismatch: true
      $invalids = $invalids.add $name

      @messenger.render $invalids

    it 'renders the validation feedback messages', ->
      # Aggregated block level validation errors
      @messenger.$errors.text()
        .should.containEql 'Please enter your email.'
      @messenger.$errors.text()
        .should.containEql 'Please enter your comment.'
      @messenger.$errors.text()
        .should.not.containEql 'Please match the requested format: (6 characters minimum)'

      # Inline validation errors
      $('label[for="name"]').html()
        .should.containEql '<span class="is-error">Please match the requested format: (6 characters minimum)</span>'

    describe '#clear', ->
      it 'removes the errors', ->
        html = $('body').html()
        html.should.containEql 'Please enter your email.'
        html.should.containEql 'Please enter your comment'
        $('.is-error').should.have.lengthOf 1

        @messenger.clear()

        html = $('body').html()
        html.should.not.containEql 'Please enter your email.'
        html.should.not.containEql 'Please enter your comment'
        $('.is-error').should.have.lengthOf 0
