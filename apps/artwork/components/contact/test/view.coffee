_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Artwork = require '../../../../../models/artwork'
jade = require 'jade'
fs = require 'fs'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

render = (templateName) ->
  filename = resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'ContactView', ->
  beforeEach (done) ->
    benv.setup =>
      artwork = new Artwork fabricate 'artwork'
      artwork.isContactable = -> true
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      $('body').html render('template')(
        artwork: artwork
        defaultMessage: 'default message'
        user: new Backbone.Model()
      )
      ContactView = benv.require resolve(__dirname, '../view')
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
