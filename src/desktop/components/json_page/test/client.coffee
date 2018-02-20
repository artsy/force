_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'JSONPageEditor', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        Blob: sinon.stub()
      jQuery.widget = sinon.stub()
      $.hulk = sinon.stub()
      Backbone.$ = $
      @JSONPageEditor = rewire '../client/editor'
      @view = new @JSONPageEditor
        $el: $('<div></div>')
        data: {
          jobs: [
            { category: 'engineering' },
            { category: 'finance' }
          ]
        }
        paths: []
      done()

  afterEach ->
    benv.teardown()

  describe '#addSortingArrows', ->

    it 'adds arrows for sorting array items', ->
      @view.setup()
      @view.$el.find('.hulk-editor')
        .append('<div class="hulk-array-element"></div>')
      @view.addSortingArrows()
      @view.$el.find('.json-page-array-header-up').length.should.be.above 0

    it 'moves items around in arrays', ->
      @view.setup()
      @view.$el.find('.hulk-editor').html '
        <div class="hulk-map">
          <div class="hulk-map">
            <div class="hulk-map-value-container"></div>
            <input class="hulk-map-key" value="jobs" />
            <div class="hulk-array">
              <div class="hulk-array-element">engineering</div>
              <div class="hulk-array-element">finance</div>
            </div>
          </div>
        </div>
      '
      @view.addSortingArrows()
      @view.$el.find('.json-page-array-header-down').click()
      @view.data.jobs.map((j) => j.category).join(',')
        .should.equal 'finance,engineering'
