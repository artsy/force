_ = require 'underscore'
Backbone = require 'backbone'
benv = require 'benv'
sinon = require 'sinon'

Mailcheck = require '../index'

describe 'Mailcheck', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.mailcheck = sinon.stub()
      $('body').append "<input id='js-mailcheck-input' name='email' type='email'>
        <div id='js-mailcheck-hint'></div>"
      done()

  afterEach ->
    benv.teardown()

  describe 'on blur', ->

    it 'shows a suggestion when a provided email is misspelled', ->
      Mailcheck.run('#js-mailcheck-input', '#js-mailcheck-hint', false)
      $('#js-mailcheck-input').val('kana@gnail.com')
      $('#js-mailcheck-input').blur()
      $.fn.mailcheck.args[0][0].suggested '',{address: 'kana', domain: 'gmail.com', full: 'kana@gmail.com'}
      $('#js-mailcheck-hint').html().length.should.not.equal 0

    it 'shows a suggestion with <br> when flagged', ->
      Mailcheck.run('#js-mailcheck-input', '#js-mailcheck-hint', true)
      $('#js-mailcheck-input').val('kana@gnail.com')
      $('#js-mailcheck-input').blur()
      $.fn.mailcheck.args[0][0].suggested '',{address: 'kana', domain: 'gmail.com', full: 'kana@gmail.com'}
      $('#js-mailcheck-hint').html().should.containEql '<br>'

  describe 'on click', ->

    it 'changes the input value to the suggested value', ->
      Mailcheck.run('#js-mailcheck-input', '#js-mailcheck-hint', true)
      $('#js-mailcheck-input').val('kana@gnail.com')
      $('#js-mailcheck-input').blur()
      $.fn.mailcheck.args[0][0].suggested '',{address: 'kana', domain: 'gmail.com', full: 'kana@gmail.com'}
      $('.js-suggestion').click()
      $('#js-mailcheck-input').val().should.containEql 'kana@gmail.com'
