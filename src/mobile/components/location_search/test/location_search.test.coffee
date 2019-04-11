Backbone = require 'backbone'
benv = require 'benv'
{ resolve } = require 'path'
sinon = require 'sinon'

describe 'Location Search', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose {
        $: benv.require 'jquery'
        google: {
          maps: { event: { addListener: sinon.stub() },
          places: { Autocomplete: sinon.stub() }}
        }
      }
      Backbone.$ = $
      benv.render resolve(__dirname, '../template.jade'), =>
      { @LocationSearchView } = benv.requireWithJadeify resolve(__dirname, '../index'), ['template']
      done()

  afterEach ->
    benv.teardown()

  beforeEach ->
    @view = new @LocationSearchView

  it 'should render the template', ->
    @view.render().$el.html().should.containEql 'Enter your city'

  it 'attach a listener', ->
    spy = sinon.spy @view, 'attach'
    @view.render()
    spy.called.should.be.ok()

  it 'should announce it\'s location', ->
    spy = sinon.spy()
    @view.on 'location:update', spy
    @view.announce {}
    spy.called.should.be.ok()
