_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Q = require 'bluebird-q'
{ resolve } = require 'path'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'EmailRegistrationView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      sinon.stub $, 'ajax'
      $.ajax.returns Q.resolve { email: 'craig@foo.com' }
      Backbone.$ = $
      $el = $('<div></div>')
      @EmailRegistrationView = benv.require resolve(
        __dirname, '../../client/email_registration')
      stubChildClasses @EmailRegistrationView, this,
        ['ThankYouView', 'AuthModalView']
        ['open', 'close', 'on', 'render']
      sinon.stub @EmailRegistrationView.prototype, 'openThankYou'
      @view = new @EmailRegistrationView el: $el
      done()

  afterEach ->
    @EmailRegistrationView::openThankYou.restore()
    benv.teardown()

  describe '#submit', ->

    it 'sends the email to our sailthru endpoint', ->
      $target = $("<div><input name='email' value='craig@foo.com'></div>")
      @view.submit(target: $target, preventDefault: sinon.stub())
      $.ajax.args[0][0].data.email.should.equal 'craig@foo.com'
      $.ajax.args[0][0].url.should.containEql '/form'
