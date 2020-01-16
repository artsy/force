_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

Artwork = require '../../../models/artwork'
OpenSeadragon = -> addHandler: sinon.stub()

describe 'DeepZoomView', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        OpenSeadragon: OpenSeadragon
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @model = new Artwork(fabricate 'artwork')
    @OpenSeadragon = OpenSeadragon()
    DeepZoomView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']
    DeepZoomView.__set__ 'getScript', (x, cb) -> cb()
    @view = new DeepZoomView el: $('body'), model: @model
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    describe 'when model#canDeepZoom is true', ->
      beforeEach ->
        @view.render()

      it 'renders the template', ->
        html = @view.$el.html()
        html.should.containEql 'dz-spinner'
        html.should.containEql 'dz-close'

      it 'sets up the OpenSeadragon viewer', ->
        _.isObject(@view.viewer).should.be.ok()

      describe '#postRender', ->
        it 'attaches a handler to the viewer that removes the loading state', ->
          @view.viewer.addHandler.args[0][0].should.equal 'tile-drawn'
