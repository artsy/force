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

      ContactView = benv.requireWithJadeify resolve(__dirname, '../view'), ['attendanceTemplate', 'inquirySentTemplate']
      ContactView::eligibleForAfterInquiryFlow = false
      ContactView.__set__ 'ConfirmInquiryView', @ConfirmInquiryView = sinon.stub()
      sinon.stub Backbone, 'sync'

      @artwork = new Artwork fabricate 'artwork'
      @artwork.isContactable = -> true
      @view = new ContactView el: $('body'), model: @artwork

      benv.render resolve(__dirname, '../templates/index.jade'), { artwork: @artwork }, => done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#submit', ->

    it 'should hide the form upon successful confirmation', ->
      @view.$('form').trigger 'submit'
      @ConfirmInquiryView.args[0][0].success()
      @view.$('#artwork-contact-form').css('display').should.equal 'none'

    it 'should display an error if there is one', ->
      @view.$('form').trigger 'submit'
      @ConfirmInquiryView.args[0][0].error @artwork, 'There was an error', {}
      @view.$('#artwork-contact-form-errors').html().should.containEql 'There was an error'

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
              _.isNull(@view.attendance).should.be.true()

          describe 'is attending', ->
            it 'leaves the attendance model intact; submits the inquiry', ->
              @view.fairs.trigger 'sync'
              @view.$('#artwork-contact-form-attending').click()
              @view.$('form').trigger 'submit'
              _.isNull(@view.attendance).should.be.false()

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
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/user_fair_action'
      Backbone.sync.args[1][2].success()
      Backbone.sync.callCount.should.equal 2

    it 'still submits the inquiry if the attendance request fails', ->
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/me/user_fair_action'
      Backbone.sync.args[1][2].error()
      Backbone.sync.callCount.should.equal 2

  describe 'messaging for a sent inquiry', ->

    it 'shows a message if the user has sent an inquiry', ->
      @view.displayInquirySent()
      $('#artwork-contact-form').attr('style').should.containEql 'display: none;'
      $('#artwork-inquiry-sent-immediate').attr('style').should.not.containEql 'display: none;'

    it '#checkInquiredArtwork shows the last sent date', ->
      inquiry = fabricate 'artwork_inquiry_request'
      _.extend(inquiry, { inquiry_url: location.href, created_at: '03-17-2014' })
      @view.checkInquiredArtwork()
      Backbone.sync.args[1][2].success [inquiry]
      $('#artwork-inquiry-sent').html().should.containEql 'Mar 17, 2014'