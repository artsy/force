_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
RelatedLinksView = require '../view'
Genes = require '../../../collections/genes'

describe 'RelatedLinksView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'with a pre-fetched collection', ->
    beforeEach ->
      @collection = new Genes _.times 5, -> fabricate('gene')

    describe 'with bare attributes', ->
      beforeEach ->
        @view = new RelatedLinksView collection: @collection, displayKey: 'name', displayValue: 'id'

      it 'generates links HTML', ->
        html = @view.render().$el.html()
        html.should.containEql '<a href="pop-art'
        html.should.containEql '>Pop Art</a>, '
        html.should.containEql '</a></div>'

    describe 'with functions', ->
      beforeEach ->
        @view = new RelatedLinksView collection: @collection, displayKey: 'name', displayValue: 'href'

      it 'generates links HTML', ->
        html = @view.render().$el.html()
        html.should.containEql '<a href="/gene/pop-art'
        html.should.containEql '>Pop Art</a>, '
        html.should.containEql '</a></div>'

    describe 'with custom templates', ->
      beforeEach ->
        class GeneLinksView extends RelatedLinksView
        GeneLinksView::headerTemplate = _.template '<h2>Related Genes</h2>'
        GeneLinksView::wrapperTemplate = _.template '<div class="related-genes-links"><%= links %></div>'
        @view = new GeneLinksView collection: @collection, displayKey: 'name', displayValue: 'href'

      it 'generates links HTML', ->
        html = @view.render().$el.html()
        html.should.containEql '<h2>Related Genes</h2><div class="related-genes-links"><a href="'
        html.should.containEql '<a href="/gene/pop-art'
        html.should.containEql '>Pop Art</a>, '
        html.should.containEql '</a></div>'

  describe 'with a collection not yet fetched', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'
      @collection = new Genes
      @response = _.times 5, -> fabricate('gene')
      @view = new RelatedLinksView collection: @collection, displayKey: 'name', displayValue: 'href'

    afterEach ->
      Backbone.sync.restore()

    it 'renders after collection sync', ->
      @collection.fetch()
      Backbone.sync.args[0][2].success @response
      html = @view.$el.html()
      html.should.containEql '<a href="/gene/pop-art'
      html.should.containEql '>Pop Art</a>, '
      html.should.containEql '</a></div>'

    describe 'when fetch returns no results', ->
      beforeEach ->
        @removeSpy = sinon.spy RelatedLinksView::, 'remove'

      afterEach ->
        @view.remove.restore()

      it 'renders nothing + removes itself', ->
        @collection.fetch()
        Backbone.sync.args[0][2].success()
        @view.remove.called.should.be.true()
        @view.$el.html().should.be.empty
