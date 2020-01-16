benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../../../models/current_user'
DeleteMyAccountFormView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'DeleteMyAccountFormView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub $, 'ajax'
    DeleteMyAccountFormView.__set__ 'FlashMessage', @FlashMessage = sinon.stub()

    @user = new CurrentUser fabricate 'user'
    @view = new DeleteMyAccountFormView user: @user

  afterEach ->
    $.ajax.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.render().$el.html()
        .should.containEql 'Please Tell Us Why'

  describe 'form contents', ->
    beforeEach ->
      @view.render()

    it 'disables the submit button until a confirmation is checked', ->
      @view.$('input[name="confirm"]').is(':checked').should.be.false()
      @view.$('button').is(':disabled').should.be.true()
      @view.$('input[name="confirm"]').click()
      @view.$('input[name="confirm"]').is(':checked').should.be.true()

    it 'allows the user to enter a reason for deleting', ->
      @view.$('textarea').val 'Removing an extra test account.'
      @view.$('input[name="confirm"]').click()
      @view.$('button').prop('disabled', false).click()
      $.ajax.args[0][0].data.explanation.should.equal @view.$('textarea').val()

  describe '#submit', ->
    beforeEach ->
      @view.render()
      @view.$('input[name="confirm"]').click()

    it 'DELETEs the user', ->
      @view.submit $.Event()
        .then =>
          $.ajax.args[0][0].method.should.equal 'DELETE'
          $.ajax.args[0][0].data.explanation.should.equal ''
          $.ajax.args[0][0].data.url.should.equal '/user/delete' # Referring path
          $.ajax.args[0][0].url.should.equal @user.url()

    it 'logs the user out', ->
      @view.submit $.Event()
        .then ->
          $.ajax.args[1][0].method.should.equal 'DELETE'
          $.ajax.args[1][0].url.should.equal '/users/sign_out'

    it 'flashes a success notification', ->
      @view.submit $.Event()
        .then =>
          @FlashMessage.called.should.be.true()
          @FlashMessage.args[0][0].href.should.eql '/'
          @FlashMessage.args[0][0].message
            .should.containEql 'Your account has been deleted, click here to continue'


    it 'adds the access token to the request', ->
      @user.set 'accessToken', 'xxx'
      @view.submit $.Event()
        .then ->
          $.ajax.args[0][0].method.should.equal 'DELETE'
          $.ajax.args[0][0].data.access_token.should.equal 'xxx'

    xdescribe 'error', ->
      # FIXME: promise mocking does not catch error
      beforeEach ->
        $.ajax
          .onCall 0
          .returns Promise.reject('There was an error')
          .returns Promise.reject(responseJSON: {message: 'Sorry, this account cannot be deleted.'})
      it 'displays the error message', ->
        @view.submit $.Event()
          .then =>
            @view.$('.js-form-errors').text()
              .should.containEql 'There was an error'
            @FlashMessage.args[0][0].message
              .should.containEql 'Sorry, this account cannot be deleted.'
