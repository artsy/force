_ = require 'underscore'
Backbone = require 'backbone'
UserEdit = require '../../models/user_edit.coffee'
fabricate = require('@artsy/antigravity').fabricate
sinon = require 'sinon'

describe 'UserEdit', ->

  beforeEach ->
    @userEdit = new UserEdit fabricate 'user'
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
        _.isUndefined(@userEdit.validate(@values)).should.be.true()

      it 'does not validate if the email is unchanged', ->
        @values.email = @userEdit.get 'email'
        _.isUndefined(@userEdit.validate(@values)).should.be.true()

    describe 'name', ->

      it 'is required', ->
        @values.name = ' '
        @userEdit.validate(@values).name.should.equal @userEdit.errorMessages.name_empty
        @values.name = @userEdit.get 'name'
        _.isUndefined(@userEdit.validate(@values)).should.be.true()

  describe '#refresh', ->

    it 'makes a client request to /user/refresh', ->
      @userEdit.refresh()
      Backbone.sync.args[0][2].url.should.equal '/user/refresh'
