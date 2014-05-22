_               = require 'underscore'
benv            = require 'benv'
sinon           = require 'sinon'
Backbone        = require 'backbone'
Artwork         = require '../../../../../models/artwork'
{ fabricate }   = require 'antigravity'
{ resolve }     = require 'path'

describe 'ContactView', ->
  beforeEach (done) ->
    benv.setup =>
      artwork = new Artwork fabricate 'artwork'
      artwork.isContactable = -> true
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      ContactView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']
      @view = new ContactView el: $('body'), model: artwork
      @view.eligibleForAfterInquiryFlow = false
      done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe '#submit', ->
    it 'submits an inquiry to the partner', ->
      @view.submit($.Event('submit'))
      _.last(Backbone.sync.args)[1].url.should.include 'v1/me/artwork_inquiry_request'
      _.last(Backbone.sync.args)[1].attributes.contact_gallery.should.be.ok
