benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
initializeInquiry = null

describe 'mobile inquiry flow initialization', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      Backbone.$ = $
      initializeInquiry = rewire '../../client/routes/inquiry'
      initializeInquiry.__set__ 'attachFastClick', sinon.stub()
      @StateView = initializeInquiry.__get__ 'StateView'
      @render = sinon.stub @StateView::, 'render', -> this
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
