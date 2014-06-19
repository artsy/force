_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
fabricate = require('antigravity').fabricate
UserEdit = require '../../models/user_edit.coffee'

describe 'UserEdit', ->
  beforeEach ->
    require('sharify').data.API_URL = 'http://localhost:5000'
    @userEdit = new UserEdit fabricate 'user'
    @authentications = [
      { id: '1', uid: '123456789', provider: 'twitter' }
      { id: '2', uid: '987654321', provider: 'facebook' }
    ]

    sinon.stub(Backbone, 'sync').yieldsTo 'success'

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchAuthentications', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success', @authentications

    it 'sets the app authentications associated with the user', ->
      @userEdit.fetchAuthentications()
      @userEdit.get('authentications').should.have.lengthOf 2
      @userEdit.get('authentications')[0].provider.should.equal @authentications[0].provider
      @userEdit.get('authentications')[1].provider.should.equal @authentications[1].provider

    it 'calls the success callback if given', (done) ->
      @userEdit.fetchAuthentications success: -> done()

  describe '#isLinkedTo', ->
    it 'determines if an account is linked to an app provider', ->
      @userEdit.isLinkedTo('twitter').should.be.false
      @userEdit.set 'authentications', @authentications
      @userEdit.isLinkedTo('twitter').should.be.true
      @userEdit.isLinkedTo('facebook').should.be.true

  describe '#checked', ->
    it 'translates a boolean attribute to on or off', ->
      @userEdit.set weekly_email: false, follow_email: true, offer_emails: false
      _.isUndefined(@userEdit.checked('weekly_email')).should.be.true
      _.isUndefined(@userEdit.checked('offer_emails')).should.be.true
      @userEdit.checked('follow_email').should.be.true
