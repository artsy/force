benv          = require 'benv'
sinon         = require 'sinon'
Backbone      = require 'backbone'
{ resolve }   = require 'path'

describe 'Location Search', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$  = $
      LocationSearchView = benv.requireWithJadeify(resolve(__dirname, '../index'), ['template'])
      LocationSearchView.__set__ 'google', {
        maps: {
          event: {
            addListener: sinon.stub()
          },
          places: {
            Autocomplete: sinon.stub()
          }
        }
      }
      @view = new LocationSearchView
      done()

  afterEach ->
    benv.teardown()

  it 'should render the template', ->
    @view.render().$el.html().should.include 'Enter your city'

  it 'attach a listener', ->
    spy = sinon.spy @view, 'attach'
    @view.render()
    spy.called.should.be.ok

  it 'should announce it\'s location', ->
    spy = sinon.spy()
    @view.on 'location:update', spy
    @view.announce {}
    spy.called.should.be.ok
