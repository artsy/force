_           = require 'underscore'
Backbone    = require 'backbone'
UserEdit    = require '../../models/user_edit.coffee'
fabricate   = require('antigravity').fabricate
sinon       = require 'sinon'

describe 'UserEdit', ->

  beforeEach ->
    require('sharify').data.ARTSY_URL = 'http://localhost:5000'
    @userEdit = new UserEdit fabricate 'user'
    @authentications = [
      { id: '1', uid: '123456789', provider: 'twitter' },
      { id: '2', uid: '987654321', provider: 'facebook' }
    ]
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe "#validate (client validation)", ->

    beforeEach ->
      @values = {}

    describe 'email', ->

      it 'ensures that the email is confirmed', ->
        @values.email = 'bob@example.com'
        @userEdit.validate(@values).email_confirmation.should.equal @userEdit.errorMessages.email_confirmation_emtpy

        @values.email_confirmation = 'bob.mckenzie@example.com'
        @userEdit.validate(@values).email_confirmation.should.equal @userEdit.errorMessages.email_confirmation

        @values.email_confirmation = 'bob@example.com'
        _.isUndefined(@userEdit.validate(@values)).should.be.true

      it 'does not validate if the email is unchanged', ->
        @values.email = @userEdit.get 'email'
        _.isUndefined(@userEdit.validate(@values)).should.be.true

    describe 'name', ->

      it 'is required', ->
        @values.name = ' '
        @userEdit.validate(@values).name.should.equal @userEdit.errorMessages.name_empty
        @values.name = @userEdit.get 'name'
        _.isUndefined(@userEdit.validate(@values)).should.be.true

  describe '#refresh', ->

    it 'makes a client request to /user/refresh', ->
      @userEdit.refresh()
      Backbone.sync.args[0][2].url.should.equal '/user/refresh'

  describe '#fetchAuthentications', ->

    it 'sets the app authentications associated with the user', ->
      @userEdit.fetchAuthentications()
      Backbone.sync.args[0][2].success @authentications
      @userEdit.get('authentications').should.have.lengthOf 2
      @userEdit.get('authentications')[0].provider.should.equal @authentications[0].provider
      @userEdit.get('authentications')[1].provider.should.equal @authentications[1].provider

    it 'calls the success callback if given', ->
      success = sinon.stub()
      @userEdit.fetchAuthentications success: success
      Backbone.sync.args[0][2].success @authentications
      success.callCount.should.equal 1

  describe '#isLinkedTo', ->

    it 'determines if an account is linked to an app provider', ->
      @userEdit.isLinkedTo('twitter').should.be.false
      @userEdit.set 'authentications', @authentications
      @userEdit.isLinkedTo('twitter').should.be.true
      @userEdit.isLinkedTo('facebook').should.be.true

  describe '#toOnOff', ->

    it 'translates a boolean attribute to on or off', ->
      @userEdit.set { weekly_email: false, follow_email: true }
      @userEdit.toOnOff('weekly_email').should.equal 'off'
      @userEdit.toOnOff('follow_email').should.equal 'on'

  describe '#onOffFacebook', ->

    it 'provides on for users that have linked their facebook account, off otherwise', ->
      @userEdit.onOffFacebook().should.equal 'off'
      @userEdit.set 'publish_to_facebook', true
      @userEdit.onOffFacebook().should.equal 'on'
      delete @userEdit.attributes.publish_to_facebook
      @userEdit.set 'authentications', @authentications
      @userEdit.onOffFacebook().should.equal 'on'

  describe '#onOffTwitter', ->

    it 'provides on for users that have linked their twitter account, off otherwise', ->
      @userEdit.onOffTwitter().should.equal 'off'
      @userEdit.set 'authentications', @authentications
      @userEdit.onOffTwitter().should.equal 'on'
