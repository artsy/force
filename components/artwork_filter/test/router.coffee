_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artwork = require '../../../models/artwork'
ArtworkFilterRouter = rewire '../router'
ArtworkFilterView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template', 'filterTemplate', 'headerTemplate']
ArtworkFilterRouter.__set__ 'ArtworkFilterView', ArtworkFilterView

describe 'ArtworkFilterRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose $: require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @router = new ArtworkFilterRouter model: new Artwork(fabricate 'artwork')

  afterEach ->
    Backbone.sync.restore()

  describe '#params', ->
    it 'stringifies the selected filter attributes', ->
      @router.view.filter.selected.set foo: 'bar', baz: 'qux'
      @router.params().should.equal 'foo=bar&baz=qux'

  describe '#currentFragment', ->
    it 'returns the current path with query string optionally attached based on what the filter state is', ->
      @router.view.filter.by foo: 'bar', baz: 'qux'
      @router.currentFragment().should.containEql '?foo=bar&baz=qux'
      @router.view.filter.deselect 'foo'
      @router.currentFragment().should.containEql '?baz=qux'
      @router.view.filter.deselect 'baz'
      @router.currentFragment().should.not.containEql '?'
