benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
path = require 'path'

describe 'SelectView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      filename = path.resolve(__dirname, '../client/select_view.coffee')
      SelectView = benv.requireWithJadeify filename, ['template']

      @triggerSpy = sinon.stub()
      SelectView.__set__ 'mediator', trigger: @triggerSpy

      @view = new SelectView
        $container: $('body')
        name: 'cabbie'
        label: 'cabbie label'
        filterOptions:
          'label1': 'value1'
          'label2': 'value2'
        filterParam: 'cabbie_label'

      done()

  afterEach ->
    benv.teardown()

  xdescribe '#initialRender', ->

    xit 'renders the select box properly', ->
      $("#select-group__select-cabbie option").length.should.equal 2
