_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Partner = require '../../../models/partner'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'ShowInquiryModal', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        sd: {}
      Backbone.$ = $
      @ShowInquiryView = benv.require resolve __dirname, '../show_inquiry_modal'
      @ContactView = @ShowInquiryView.__get__ 'ContactView'
      sinon.stub @ContactView::, 'onSubmit'
      sinon.stub @ContactView::, 'submit'
      sinon.stub @ShowInquiryView::, 'initialize'
      @view = new @ShowInquiryView
      @view.show = new Backbone.Model fabricate 'show'
      @view.partner = new Partner fabricate 'partner'
      @view.partner.related().locations.add fabricate 'location'
      @view.model = new Backbone.Model
      @view.model.url = ''
      done()

  afterEach ->
    benv.teardown()
    @ContactView::submit.restore()
    @ContactView::onSubmit.restore()
    @ShowInquiryView::initialize.restore()

  describe '#submit', ->

    it 'submits an inquiry about the show', ->
      @view.show.set id: 'foo-gallery-show'
      @view.onSubmit { preventDefault: -> }
      @view.model.toJSON().inquireable_id.should.equal 'foo-gallery-show'
      @view.model.toJSON().inquireable_type.should.equal 'partner_show'
      @view.model.toJSON().contact_gallery.should.equal true
      @ContactView::submit.called.should.be.ok()

  describe '#renderLocation', ->

    it 'renders the partners locations', ->
      @view.$el.html "<div class='contact-location'></div>"
      @view.renderLocation()
      @view.$el.html().should.containEql 'New York'
