_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
PasswordEdit = require '../../models/password_edit.coffee'
fabricate = require('@artsy/antigravity').fabricate

describe 'PasswordEdit', ->

  beforeEach ->
    @passwordEdit = new PasswordEdit fabricate 'user'
    @user = new CurrentUser fabricate 'user'

  describe '#url', ->

    it 'should leverage the parent url', ->
      @passwordEdit.url().should.equal "#{@user.url()}/password"


  describe "#validate (client validation)", ->

    beforeEach ->
      @values = {}

    it 'ensures that the password is at least six chars long', ->
      @values.new_password = '12345'
      @passwordEdit.validate(@values).new_password.should.equal @passwordEdit.errorMessages.new_password_min
      @values.new_password = '123456'
      _.isUndefined(@passwordEdit.validate(@values)).should.be.true()

    it 'ensures the confirmation password matches the new', ->
      @values.new_password = '123456'
      @values.password_confirmation = '654321'
      @passwordEdit.validate(@values).password_confirmation.should.equal @passwordEdit.errorMessages.password_confirmation
      @values.password_confirmation = '123456'
      _.isUndefined(@passwordEdit.validate(@values)).should.be.true()

    it "ensures the new isn't the old", ->
      @values =
        new_password: '123456'
        password_confirmation: '123456'
        current_password: '123456'
      @passwordEdit.validate(@values).new_password.should.equal @passwordEdit.errorMessages.new_password_same
      @values.current_password = '654321'
      _.isUndefined(@passwordEdit.validate(@values)).should.be.true()
