{ extend } = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
ArtworkCommercialView = benv.requireWithJadeify require.resolve('../view.coffee'), ['template', 'confirmation']
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../../models/current_user.coffee'

describe 'ArtworkCommercialView', ->
  before (done) ->
    user = new CurrentUser fabricate('user')
    user.hasLabFeature = (feature) ->
      feature == 'New Buy Now Flow'
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        user: user
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
    sinon.stub location, 'assign'

  afterEach ->
    Backbone.sync.restore()
    location.assign.restore()

  describe 'an ecommerce work with multiple edition sets', ->
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
      it 'should show an auth modal if the user is not logged in', ->
        createOrderStub = sinon.stub()
        mediatorStub = trigger: sinon.stub()
        ArtworkCommercialView.__set__
          mediator: mediatorStub
          createOrder: createOrderStub
          sd:
            ENABLE_NEW_BUY_NOW_FLOW: true
          CurrentUser:
            orNull: ->
              null

        @view.$('.js-artwork-acquire-button').click()
        createOrderStub.callCount.should.equal(0)
        mediatorStub.trigger.args[0][0].should.equal 'open:auth'
        mediatorStub.trigger.args[0][1].mode.should.equal 'login'

      it 'purchases an artwork by creating a new order', ->
        ArtworkCommercialView.__set__ 'CurrentUser',
          orNull: ->
            hasLabFeature: (feature) -> feature == 'New Buy Now Flow'

        createOrderStub = sinon.stub().returns(Promise.resolve(ecommerceCreateOrderWithArtwork: orderOrError: order: id: "1234"))
        ArtworkCommercialView.__set__ 'createOrder', createOrderStub

        @view.$('.js-artwork-acquire-button').click()
        createOrderStub.calledOnce.should.be.ok()
        createOrderStub
          .calledWith
            artworkId: '56e86588b202a366da000571'
            editionSetId: '56e866cd275b241d87000510'
            quantity: 1
            user: sinon.match.any
          .should.be.ok()

      it 'shows an error modal when create order mutation fails', ->
        ArtworkCommercialView.__set__ 'CurrentUser',
          orNull: ->
            hasLabFeature: (feature) -> feature == 'New Buy Now Flow'

        createOrderStub = sinon.stub().returns(Promise.resolve(ecommerceCreateOrderWithArtwork: orderOrError: error: code: "failed"))
        ArtworkCommercialView.__set__ 'createOrder', createOrderStub

        errorModalMock = { render: sinon.spy(), renderBuyNowError: sinon.spy() }
        ArtworkCommercialView.__set__ 'errorModal', errorModalMock

        @view.$('.js-artwork-acquire-button').click()
        createOrderStub.calledOnce.should.be.ok()

        setTimeout (() -> errorModalMock.renderBuyNowError.calledOnce.should.be.ok()), 0

  describe 'an ecommerce work with a single edition set', ->
    beforeEach ->
      @view = new ArtworkCommercialView require '../../../test/fixtures/acquireable_artwork_single_edition.json'
      @view.render()
    describe '#acquire', ->
      it 'purchases an artwork with a single edition set', ->
        ArtworkCommercialView.__set__ 'CurrentUser',
          orNull: ->
            hasLabFeature: (feature) -> feature == 'New Buy Now Flow'

        createOrderStub = sinon.stub().returns(Promise.resolve(ecommerceCreateOrderWithArtwork: orderOrError: order: id: "1234"))
        ArtworkCommercialView.__set__ 'createOrder', createOrderStub
        @view.$('.js-artwork-acquire-button').click()
        createOrderStub.calledOnce.should.be.ok()
        createOrderStub
          .calledWith
            artworkId: '56e86588b202a366da000571'
            editionSetId: '56e866cd275b241d87000510'
            quantity: 1
            user: sinon.match.any
          .should.be.ok()

  describe 'an ecommerce work without edition set', ->
    beforeEach ->
      @view = new ArtworkCommercialView require '../../../test/fixtures/acquireable_artwork_no_edition.json'
      @view.render()
    describe '#acquire', ->
      it 'purchases an artwork without edition set', ->
        ArtworkCommercialView.__set__ 'CurrentUser',
          orNull: ->
            hasLabFeature: (feature) -> feature == 'New Buy Now Flow'

        createOrderStub = sinon.stub().returns(Promise.resolve(ecommerceCreateOrderWithArtwork: orderOrError: order: id: "1234"))
        ArtworkCommercialView.__set__ 'createOrder', createOrderStub
        @view.$('.js-artwork-acquire-button').click()
        createOrderStub.calledOnce.should.be.ok()
        createOrderStub
          .calledWith
            artworkId: '56e86588b202a366da000571'
            editionSetId: undefined
            quantity: 1
            user: sinon.match.any
          .should.be.ok()

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
