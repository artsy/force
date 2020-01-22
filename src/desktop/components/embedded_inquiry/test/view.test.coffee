Q = require 'bluebird-q'
_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Artwork = require '../../../models/artwork'
CurrentUser = require '../../../models/current_user'
EmbeddedInquiryView = null

describe 'EmbeddedInquiryView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      EmbeddedInquiryView = benv.requireWithJadeify require.resolve('../view'), [
        'template'
        'confirmation'
      ]
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @questionnaire = sinon.stub()
      .returns view: new Backbone.View

    EmbeddedInquiryView.__set__ 'openInquiryQuestionnaireFor', @questionnaire

  describe 'logged in', ->
    beforeEach ->
      @user = new CurrentUser fabricate 'user',
        name: 'Bar Baz', email: 'barbaz@example.com'
      @artwork = new Artwork fabricate 'artwork'
      @view = new EmbeddedInquiryView user: @user, artwork: @artwork
      @view.render()

    describe '#render', ->
      it 'renders the template correctly', ->
        @view.$('input, textarea').map(-> $(this).attr('name')).get()
          .should.eql [
            'artwork'
            'message'
          ]

        @view.$('button').text()
          .should.equal 'Contact Gallery'

    describe 'submit', ->
      it 'sets the form data on the appropriate models, saves everything, and opens the questionnaire', ->
        @view.$('textarea[name="message"]').val 'I want to buy this artwork'
        @view.$('button').click()

        @view.inquiry.get('artwork').should.equal @artwork.id
        @view.inquiry.get('message').should.equal 'I want to buy this artwork'

        @view.user.get('name').should.equal 'Bar Baz'
        @view.user.get('email').should.equal 'barbaz@example.com'

        @view.inquiry.get 'notification_delay'
          .should.equal 600

        @questionnaire.called.should.be.true()

        Object.keys(@questionnaire.args[0][0])
          .should.eql [
            'user'
            'inquiry'
            'artwork'
          ]

      it 'ultimately renders a success message once the inquiry is synced', ->
        sinon.stub Backbone, 'sync'
          .yieldsTo 'success'

        @view.$('textarea[name="message"]').val 'I want to buy this artwork'
        @view.$('button').click()

        @view.$el.html().should.not.containEql 'Inquiry Sent'

        @view.inquiry.save() # Saved somewhere out of band

        html = @view.$el.html()
        html.should.containEql 'Inquiry Sent'
        html.should.containEql 'You will receive an email receipt of your inquiry shortly.'
        html.should.containEql 'If you want to follow up with the gallery, simply reply to this email.'

        Backbone.sync.restore()

      it 're-enables the form if the modal is aborted or errors (and subsequently closes)', (done) ->
        @view.$('button').is(':disabled').should.be.false()
        @view.$('textarea[name="message"]').val 'I want to buy this artwork'

        @view.$('button').click()

        _.defer =>
          @view.$('button').is(':disabled').should.be.true()
          @view.modal.view.trigger 'closed'
          @view.$('button').is(':disabled').should.be.false()

          done()

      it 'stops the button spinner once the modal opens', ->
        @view.$('textarea[name="message"]').val 'I want to buy this artwork'
        @view.$('button').click()

        @view.$('button').attr 'data-state'
          .should.equal 'loading'

        @view.modal.view.trigger 'opened'

        @view.$('button').attr 'data-state'
          .should.equal 'default'

  describe 'logged out', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @view = new EmbeddedInquiryView artwork: @artwork
      @view.render()

    describe '#render', ->
      it 'renders the template correctly', ->
        @view.$('input, textarea').map(-> $(this).attr('name')).get()
          .should.eql [
            'artwork'
            'name'
            'email'
            'message'
          ]

        @view.$('button').text()
          .should.equal 'Contact Gallery'

    describe '#submit', ->
      it 'sets the form data on the appropriate models and opens the questionnaire', ->
        @questionnaire.called.should.be.false()

        @view.$('input[name="name"]').val 'Foo Bar'
        @view.$('input[name="email"]').val 'foobar@example.com'
        @view.$('textarea[name="message"]').val 'I want to buy this artwork'
        @view.$('button').click()

        @view.inquiry.get('artwork').should.equal @artwork.id
        @view.inquiry.get('message').should.equal 'I want to buy this artwork'

        @view.user.get('name').should.equal 'Foo Bar'
        @view.user.get('email').should.equal 'foobar@example.com'

        @view.inquiry.get 'notification_delay'
          .should.equal 600

        @questionnaire.called.should.be.true()

        Object.keys(@questionnaire.args[0][0])
          .should.eql [
            'user'
            'inquiry'
            'artwork'
          ]

  describe 'alternate partner types', ->
    it 'renders the correct button copy', ->
      artwork = new Artwork fabricate 'artwork', partner: type: 'Auction'
      view = new EmbeddedInquiryView artwork: artwork
      view.render().$('button').text()
        .should.equal 'Contact Auction House'

  describe 'fair context', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @artwork.related().fairs.add fabricate 'fair'
      @view = new EmbeddedInquiryView artwork: @artwork

    it 'renders the attendance checkbox for an open fair', ->
      tomorrow = new Date (new Date()).getTime() + (24*60*60*1000)
      @artwork.related().fairs.first().set 'end_at', tomorrow.toISOString()
      @artwork.related().fairs.first().isOver()
      @view.render()
      html = @view.$el.html()
      html.should.containEql 'I will attend Armory Show'
      html.should.containEql 'This artwork is part of the art fair—Armory Show.'

    it 'renders the attendance checkbox for an closed fair', ->
      yesterday = new Date (new Date()).getTime() - (24*60*60*1000)
      @artwork.related().fairs.first().set 'end_at', yesterday.toISOString()
      @view.render()
      html = @view.$el.html()
      html.should.containEql 'I attended Armory Show'
      html.should.containEql 'This artwork is part of the art fair—Armory Show.'

    it 'renders if the sync comes post-render', ->
      artwork = new Artwork fabricate 'artwork'

      view = new EmbeddedInquiryView artwork: artwork
      view.render().$el.html()
        .should.not.containEql 'Async Fair'

      artwork.related().fairs.add fabricate 'fair', name: 'Async Fair'
      artwork.related().fairs.trigger 'sync'

      view.$el.html()
        .should.containEql 'Async Fair'

    describe 'user is not attending', ->
      it 'does not add a user fair action', ->
        @view.render()
        @view.$('input[name="name"]').val 'Not Attending'
        @view.$('button').click()

        @view.user.get 'name'
          .should.equal 'Not Attending'

        userFairAction = @view.user.related()
          .collectorProfile.related()
          .userFairActions
            .should.have.lengthOf 0

    describe 'user is attending', ->
      it 'adds a user fair action, when the box is checked', ->
        @view.render()
        @view.$('input[name="name"]').val 'Is Attending'
        @view.$('input[type="checkbox"]').click()
        @view.$('button').click()

        @view.user.get 'name'
          .should.equal 'Is Attending'

        userFairAction = @view.user.related()
          .collectorProfile.related()
          .userFairActions.first()

        userFairAction.attributes
          .should.eql {
            action: 'Attendee'
            fair_id: 'armory-show-2013'
          }
