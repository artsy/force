benv = require 'benv'
alertable = require '../index'

describe 'alertable', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $('body').html '
      <input name="email">
      <button>Submit</button>
    '

  describe 'not triggering alertable', ->
    beforeEach ->
      @$input = $('input[name="email"]')
        .val 'barbaz@example.com'

      alertable { $input: @$input, message: "Please change your email." }, (value) ->
        value is 'foobar@example.com'

    it 'does nothing', ->
      $('.alertable-input')
        .should.have.lengthOf 0

      $('body').html()
        .should.not.containEql '
          <div class="alertable-input" data-alert="Please change your email."><input name="email"></div>
        '

  describe 'triggering alertable', ->
    beforeEach ->
      @$input = $('input[name="email"]')
        .val 'foobar@example.com'

      alertable { $input: @$input, message: "Please change your email." }, (value) ->
        value is 'foobar@example.com'

    it 'alerts you if the predicate passes, by wrapping the input and inserting the message', ->
      $('body').html()
        .should.containEql '
          <div class="alertable-input" data-alert="Please change your email."><input name="email"></div>
        '

    xit 'unwraps (and dismisses) the alert when the input is subsequently focused', ->
      console.log 'JSDOM + focus/blur is annoying. It works, trust me.'

  describe 'with submit button', ->
    it 'alters the button label', ->
      $input = $('input[name="email"]')
        .val 'foobar@example.com'

      $submit = $('button')

      $submit.text().should.equal 'Submit'

      alertable {
        $input: $input
        message: "Please change your email."
        $submit: $submit
        label: 'Are you sure?'
      }, (value) ->
        value is 'foobar@example.com'

      $submit.text().should.equal 'Are you sure?'
