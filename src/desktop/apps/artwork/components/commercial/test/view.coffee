{ extend } = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
ArtworkCommercialView = benv.requireWithJadeify require.resolve('../view.coffee'), ['template', 'confirmation']

describe 'ArtworkCommercialView', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        sd:
          FORCED_LOGIN_INQUIRY: 'default'
        stitch:
          components:
            TooltipQuestion: sinon.stub()
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe 'an ecommerce work', ->
    beforeEach ->
      @view = new ArtworkCommercialView require '../../../test/fixtures/acquireable_artwork.json'
      @view.render()

    describe '#render', ->
      it 'correctly renders the template', ->
        @view.$ '.artwork-edition-set'
          .should.have.lengthOf 4
        @view.$ '.js-artwork-acquire-button'
          .should.have.lengthOf 1

    describe '#acquire', ->
      it 'purchases the work by creating a new PendingOrder', ->
        @view.$('.js-artwork-acquire-button').click()

        Backbone.sync.args[0][0]
          .should.equal 'create'

        Backbone.sync.args[0][1].attributes.should.eql
          artwork_id: 'yee-wong-exploding-powder-movement-blue-and-pink'
          edition_set_id: '56e866cd275b241d87000510'
          quantity: null
          replace_order: true
          session_id: undefined

  describe 'an inquireable work, not in a fair', ->
    beforeEach ->
      @questionnaire = sinon.stub()
        .returns view: new Backbone.View

      ArtworkCommercialView.__set__ 'openInquiryQuestionnaireFor', @questionnaire

      @view = new ArtworkCommercialView require '../../../test/fixtures/inquireable_artwork.json'
      @view.render()

    describe '#render', ->
      it 'correctly renders the template', ->
        @view.$('textarea').text()
          .should.containEql 'Hi, I’m interested in purchasing this work. Could you please provide more information about the piece?'

        @view.$ '.js-artwork-inquire-button'
          .should.have.lengthOf 1

    describe '#inquiry', ->
      it 'sets up the inquiry and opens the inquiry modal', ->
        Backbone.sync.returns Promise.resolve {}

        @view.$('input[name="name"]').val 'Damon'
        @view.$('input[name="email"]').val 'damon@artsy'
        @view.$('textarea[name="message"]').val 'I want to buy this'
        @view.$('.js-artwork-inquire-button').click()

        Backbone.sync.args[0][1].url()
          .should.containEql '/api/v1/artwork/lynn-hershman-leeson-wrapped'

        @view.inquiry.attributes
          .should.eql
            notification_delay: 600,
            session_id: undefined,
            referring_url: undefined,
            landing_url: undefined,
            artwork: 'lynn-hershman-leeson-wrapped',
            name: 'Damon',
            email: 'damon@artsy',
            message: 'I want to buy this'

      describe 'successful inquiry', ->
        it 'renders the confirmation', ->
          Backbone.sync.returns Promise.resolve {}
          @view.inquire $.Event 'click'
            .then =>
              @view.inquiry.trigger 'sync'

              html = @view.$el.html()
              html.should.containEql 'Inquiry Sent'
              html.should.containEql 'You will receive an email receipt of your inquiry shortly.'

  describe 'an inquireable work, in a fair', ->

    describe 'fair is open', ->
      beforeEach ->
        fixture = extend {}, require '../../../test/fixtures/inquireable_artwork.json'
        tomorrow = new Date (new Date()).getTime() + (24*60*60*1000)
        fixture.data.artwork.fair = id: 'foo-fair', name: 'Foo Fair 2016', end_at: tomorrow.toISOString()
        @view = new ArtworkCommercialView fixture

        @view.render()

      describe '#render', ->
        it 'correctly renders the template', ->
          @view.$el.html()
            .should.containEql 'I will attend Foo Fair'

      describe '#inquiry', ->
        it 'marks the attendance', ->
          Backbone.sync.returns then: sinon.stub()
          @view.$('input[name="attending"]').prop 'checked', true
          @view.$('.js-artwork-inquire-button').click()

          @view.user.isAttending id: 'foo-fair'
            .should.be.true()

    describe 'fair is closed', ->
      beforeEach ->
        fixture = extend {}, require '../../../test/fixtures/inquireable_artwork.json'
        yesterday = new Date (new Date()).getTime() - (24*60*60*1000)
        fixture.data.artwork.fair = id: 'foo-fair', name: 'Foo Fair 2016', end_at: yesterday.toISOString()
        @view = new ArtworkCommercialView fixture

        @view.render()

      describe '#render', ->
        it 'correctly renders the template', ->
          @view.$el.html()
            .should.containEql 'I attended Foo Fair'

      describe '#inquiry', ->
        it 'marks the attendance', ->
          Backbone.sync.returns then: sinon.stub()
          @view.$('input[name="attending"]').prop 'checked', true
          @view.$('.js-artwork-inquire-button').click()

          @view.user.isAttending id: 'foo-fair'
            .should.be.true()
