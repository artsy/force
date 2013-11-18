rewire    = require 'rewire'
benv      = require 'benv'
Backbone  = require 'backbone'
sinon     = require 'sinon'

describe 'ModalView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      benv.render '../template.jade', {}, =>
        FeedbackView = benv.requireWithJadeify '../view', ['template']
        @modal = new FeedbackView(width: '500px')
        done()

  afterEach ->
    benv.teardown()

  describe '#submit', ->
    it 'should validate the form before submitting'

    it 'should submit the form'

    it 'should close the modal after successfully submitting'
