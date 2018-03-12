_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Artwork = require '../../../../../../models/artwork'
Profile = require '../../../../../../models/profile'
CurrentUser = require '../../../../../../models/current_user'
benv = require 'benv'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
SubmitInquiryView = null

describe 'SubmitInquiryView', ->

  beforeEach (done) ->
    artists = [ fabricate 'artist' ]
    @artwork = fabricate('artwork', image: { url: 'artwork.png' }, artists: artists)

    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      benv.render resolve(__dirname, '../../../../templates/ask_specialist_page.jade'), {
        artwork: @artwork
        profile: new Profile(fabricate 'profile')
        sd: {}
        asset: (->)
      }, =>
        SubmitInquiryView = benv.requireWithJadeify(
          resolve(__dirname, '../../client/ask_specialist'),
          ['formTemplate', 'confirmationTemplate']
        )
        SubmitInquiryView.__set__ 'Cookies', { set: (->), get: (->) }
        sinon.stub Backbone, 'sync'
        @view = new SubmitInquiryView
          el: $ 'body'
          model: new Artwork @artwork
          sessionID: 'foobar'
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#serializeForm', ->
    beforeEach ->
      @view.$('.submit-inquiry-name').val 'Foo Bar'
      @view.$('.submit-inquiry-email').val 'foo@bar.com'
      @view.$('.submit-inquiry-message').val 'I like this foo for its barring.'

    it 'should serialize the form input', ->
      output = { name: 'Foo Bar', email: 'foo@bar.com', message: 'I like this foo for its barring.' }
      _.isEqual(@view.serializeForm(), output).should.be.ok()

  describe '#submitInquiry', ->

    it 'submits a new inquiry from the view', ->
      sinon.stub @view.inquiry, 'set'
      @view.$('.submit-inquiry-name').val 'Foo Bar'
      @view.$('.submit-inquiry-email').val 'foo@bar.com'
      @view.$('.submit-inquiry-message').val 'I like this foo for its barring.'
      @view.$('.submit-inquiry-form').submit()
      @view.inquiry.set.args[0][0].name.should.equal 'Foo Bar'
      @view.inquiry.set.args[0][0].email.should.equal 'foo@bar.com'
      @view.inquiry.set.args[0][0].message.should.equal 'I like this foo for its barring.'

    it 'should render a success message on success', ->
      @view.inquiry.set email: 'foo@bar.com', name: 'foo'
      sinon.stub(@view.inquiry, 'save').yieldsTo('success')
      sinon.stub @view.$el, 'html'
      @view.$('.submit-inquiry-form').submit()
      @view.$el.html.args[0][0].should.containEql 'message has been sent'

    it 'should render an error message on error', ->
      sinon.stub(@view.inquiry, 'save').yieldsTo('error')
      sinon.stub @view.$el, 'html'
      @view.inquiry.validate = sinon.stub()
      @view.$('.submit-inquiry-form').submit()
      @view.$el.html.args[0][0].should.containEql 'Sorry, there was an error'

    it 'sets the referring url, landing_url, and inquiry_url', ->
      sinon.stub @view.inquiry, 'set'
      SubmitInquiryView.__get__('Cookies').get = (key) ->
        switch key
          when 'inquiry-referrer' then 'foo/bar'
          when 'inquiry-session-start' then 'baz/bam'
      global.location.pathname = 'foo/bar'
      @view.submitInquiry { preventDefault: sinon.stub() }
      @view.inquiry.set.args[0][0].referring_url.should.containEql 'foo/bar'
      @view.inquiry.set.args[0][0].landing_url.should.containEql 'baz/bam'
