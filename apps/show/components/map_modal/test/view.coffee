_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
PartnerShow = require '../../../../../models/partner_show.coffee'
Partner = require '../../../../../models/partner.coffee'
ModalView = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template']

describe 'MapModalView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown(false)

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @MapModalView = sinon.stub()
    ModalView.__set__ 'MapModal', @MapModalView
    @relatedShow = new PartnerShow fabricate 'show' 
    @view = new ModalView model: @relatedShow
    done() 

  afterEach -> 
    Backbone.sync.restore() 

  describe '#openMapModal', ->
    it 'creates a map modal view', -> 
      @view.openMapModal({preventDefault: ->})
      @MapModalView.calledWithNew()