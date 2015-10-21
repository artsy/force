benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
initializeInquiry = rewire '../../client/routes/inquiry'

describe 'mobile inquiry flow initialization', ->
  before (done) ->
    @StateView = initializeInquiry.__get__ 'StateView'
    @render = sinon.stub @StateView::, 'render', -> this

    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()
    @render.restore()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    { @state } = @questionnaire =
      initializeInquiry 'foobar-artwork-id'

  afterEach ->
    Backbone.sync.restore()

  it 'sets up the inquiry flow', ->
    @state.current().should.equal 'inquiry'
