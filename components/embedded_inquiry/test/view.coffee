_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artwork = require '../../../models/artwork'
CurrentUser = require '../../../models/current_user'
EmbeddedInquiryView = benv.requireWithJadeify require.resolve('../view'), [
  'template'
  'confirmation'
]

describe 'EmbeddedInquiryView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
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
            'message'
          ]

        @view.$('button').text()
          .should.equal 'Contact Gallery'

    describe 'submit', ->
      it 'sets the form data on the appropriate models and opens the questionnaire', ->
        @view.$('textarea[name="message"]').val 'I want to buy this artwork'
        @view.$('button').click()

        @view.inquiry.get('message').should.equal 'I want to buy this artwork'
        @view.user.get('name').should.equal 'Bar Baz'
        @view.user.get('email').should.equal 'barbaz@example.com'

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

        @view.inquiry.save() # Saved somewhere out of band

        (html = @view.$el.html()).should.containEql 'Inquiry Sent'
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

  describe 'logged out', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @view = new EmbeddedInquiryView artwork: @artwork
      @view.render()

    describe '#render', ->
      it 'renders the template correctly', ->
        @view.$('input, textarea').map(-> $(this).attr('name')).get()
          .should.eql [
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

        @view.inquiry.get('message').should.equal 'I want to buy this artwork'
        @view.user.get('name').should.equal 'Foo Bar'
        @view.user.get('email').should.equal 'foobar@example.com'

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
