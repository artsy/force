benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
VeniceBanner = benv.requireWithJadeify require.resolve('../index.coffee'), ['template']

describe 'VeniceBanner', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      $.fn.fadeOut = sinon.stub()
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new VeniceBanner
      el: $('body')
    @view.render()

  it 'Renders the content', ->
    $('body').html().should.containEql '<h2>Explore our 360° coverage of the 2017 Venice Biennale</h2>'

  it '#closeVeniceBanner closes the banner', ->
    $('a.icon-close').click()
    $.fn.fadeOut.called.should.eql true