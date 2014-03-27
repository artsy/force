_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'ShowInquiryModal', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      @ShowInquiryView = benv.require resolve __dirname, '../show_inquiry_modal'
      @ContactView = @ShowInquiryView.__get__ 'ContactView'
      sinon.stub @ContactView::, 'submit'
      sinon.stub @ShowInquiryView::, 'initialize'
      @view = new @ShowInquiryView
      @view.show = new Backbone.Model fabricate 'show'
      @view.model = new Backbone.Model
      @view.model.url = ''
      done()

  afterEach ->
    benv.teardown()
    @ContactView::submit.restore()
    @ShowInquiryView::initialize.restore()

  describe '#submit', ->

    it 'submits an inquiry about the show', ->
      @view.show.set id: 'foo-gallery-show'
      @view.submit { preventDefault: -> }
      @view.model.toJSON().inquireable_id.should.equal 'foo-gallery-show'
      @view.model.toJSON().inquireable_type.should.equal 'partner_show'
      @view.model.toJSON().contact_gallery.should.equal true
      @ContactView::submit.called.should.be.ok
