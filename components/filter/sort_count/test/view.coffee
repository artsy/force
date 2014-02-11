_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

# This view has templates, need to require with Jadeify
FilterSortCount = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'FilterArtworksNav', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      FilterSortCount.__set__ 'mediator', @mediator = { 
        trigger: sinon.stub()
        on: sinon.stub()
      }
      @view = new FilterSortCount el: $ "<div></div>"
      done()

  afterEach ->
    benv.teardown()

  it 'renders the counts', ->
    @view.locals = counts: 1001
    @view.render()
    @view.$el.html().should.include '1001'

  it 'triggers a filter even for sorting', ->
    @view.sort target: $ "<div data-sort='-foo'></div>"
    @mediator.trigger.args[0][0].should.equal 'filter'
    @mediator.trigger.args[0][1].sort.should.equal '-foo'