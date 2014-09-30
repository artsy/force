_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artwork = require '../../../../../models/artwork'
CurrentUser = require '../../../../../models/current_user'

describe 'ContactView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $

      ContactView = benv.requireWithJadeify resolve(__dirname, '../view'), ['attendanceTemplate']
      ContactView::eligibleForAfterInquiryFlow = false

      sinon.stub Backbone, 'sync'

      @artwork = new Artwork fabricate 'artwork'
      @artwork.isContactable = -> true
      @view = new ContactView el: $('body'), model: @artwork

      benv.render resolve(__dirname, '../templates/index.jade'), { artwork: @artwork }, => done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#submit', ->
    it 'submits an inquiry to the partner', ->
      @view.$('form').trigger 'submit'
      _.last(Backbone.sync.args)[1].url.should.containEql '/api/v1/me/artwork_inquiry_request'
      _.last(Backbone.sync.args)[1].attributes.contact_gallery.should.be.true

  describe 'is logged out', ->
    describe 'during a fair', ->
      beforeEach ->
        @view.fairs.add(fabricate 'fair', name: 'Honorable Fair 2018', id: 'honorable-fair')

      describe '#renderAttendance', ->
        it 'renders the fair attendance checkbox', ->
          @view.$el.html().should.not.containEql 'This artwork is part of the art fair—Honorable Fair'
          @view.fairs.trigger 'sync'
          @view.$el.html().should.containEql 'This artwork is part of the art fair—Honorable Fair'

        it 'sets up the attendance model', ->
          @view.fairs.trigger 'sync'
          @view.attendance.attributes.should.eql
            name: 'Honorable Fair'
            action: 'Attendee'
            fair_id: 'honorable-fair'

      describe '#maybeWaitForAttendance', ->
        describe 'logged out', ->
          describe 'not attending', ->
            it 'nulls the attendance model', ->
              @view.fairs.trigger 'sync'
              @view.$('form').trigger 'submit'
              _.isNull(@view.attendance).should.be.true

          describe 'is attending', ->
            it 'leaves the attendance model intact; submits the inquiry', ->
              @view.fairs.trigger 'sync'
              @view.$('#artwork-contact-form-attending').click()
              @view.$('form').trigger 'submit'
              _.isNull(@view.attendance).should.be.false

  describe 'is logged in', ->
    beforeEach ->
      @view.user = new CurrentUser fabricate 'user'
      @view.fairs.add(fabricate 'fair', name: 'Honorable Fair 2018', id: 'honorable-fair')
      @view.fairs.trigger 'sync'
      @view.$('input[name="name"]').val 'Foo Bar'
      @view.$('input[name="email"]').val 'foobar@example.com'
      @view.$('#artwork-contact-form-attending').click()
      @view.$('form').trigger 'submit'

    it 'creates an attendance action before submitting the inquiry', ->
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/user_fair_action'
      Backbone.sync.args[0][2].success()
      Backbone.sync.callCount.should.equal 2
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/artwork_inquiry_request'

    it 'still submits the inquiry if the attendance request fails', ->
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/user_fair_action'
      Backbone.sync.args[0][2].error()
      Backbone.sync.callCount.should.equal 2
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/artwork_inquiry_request'
