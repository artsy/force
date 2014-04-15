_               = require 'underscore'
rewire          = require 'rewire'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

CurrentUser     = require '../../../../models/current_user.coffee'

describe 'UserDeleteForm', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @user = new CurrentUser fabricate 'user'
    sinon.stub $, 'ajax'
    benv.render resolve(__dirname, '../../templates/delete.jade'), {
      sd: {}
      user: @userEdit
    }, =>
      @UserDeleteForm = benv.requireWithJadeify(
        (resolve __dirname, '../../client/delete_form.coffee'), []
      )
      @deleteForm = new @UserDeleteForm
        el   : $('#settings')
        model: @user
      done()


  afterEach ->
    $.ajax.restore()

  describe 'form contents', ->

    it 'disables the submit button until a confirmation is checked', ->
      @deleteForm.$confirm.is(':checked').should.be.false
      @deleteForm.$submitButton.is(':disabled').should.be.true
      @deleteForm.$confirm.click()
      @deleteForm.$confirm.is(':checked').should.be.true
      @deleteForm.$submitButton.is(':disabled').should.be.false

    it 'allows the user to enter a reason for deleting', ->
      @deleteForm.$explanation.val 'Removing an extra test account.'
      @deleteForm.$confirm.click()
      @deleteForm.$submitButton.click()
      $.ajax.args[0][0].data.explanation.should.equal @deleteForm.$explanation.val()

  describe 'form submission', ->

    it 'makes a post to delete the user', ->
      @deleteForm.$confirm.click()
      @deleteForm.$submitButton.click()
      $.ajax.args[0][0].data.explanation.should.equal ''
      $.ajax.args[0][0].data.url.should.equal '/user/delete' # source of the post
      $.ajax.args[0][0].url.should.equal @user.url()

    it 'shows a success message (hides the rest) with a link sign out', ->
      # Note: CSS (not available in this test set up) hides the success message on load
      @deleteForm.$confirm.click()
      @deleteForm.$submitButton.click()
      $.ajax.args[0][0].success()
      @deleteForm.$('form').css('display').should.equal 'none'
      @deleteForm.$successMessage.is(':visible').should.be.true
      @deleteForm.$successMessage.find("a[href='/users/sign_out']").should.have.lengthOf 1

    it 'shows an error message (hides the rest) in the case of an error', ->
      # Note: CSS (not available in this test set up) hides the error message on load
      @deleteForm.$confirm.click()
      @deleteForm.$submitButton.click()
      $.ajax.args[0][0].error()
      @deleteForm.$('form').css('display').should.equal 'none'
      @deleteForm.$failureMessage.is(':visible').should.be.true

    it 'adds the access token to the request', ->
      @user.set 'accessToken', '10101000101010101111010101010101'
      @deleteForm.$confirm.click()
      @deleteForm.$submitButton.click()
      _.isUndefined($.ajax.args[0][0].data.access_token).should.be.false
      $.ajax.args[0][0].method.should.equal 'delete'
      $.ajax.args[0][0].data.access_token.should.equal @user.get('accessToken')
