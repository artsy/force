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
      sinon.stub $, 'ajax'
      ContactView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']
      @view = new ContactView el: $('body'), model: artwork
      done()

  afterEach ->
    $.ajax.restore()
    benv.teardown()

  describe '#submit', ->
    it 'submits an inquiry to the partner', ->
      @view.submit(preventDefault: ->)
      _.last($.ajax.args)[0].url.should.include 'v1/me/artwork_inquiry_request'
      _.last($.ajax.args)[0].data.contact_gallery.should.be.ok
