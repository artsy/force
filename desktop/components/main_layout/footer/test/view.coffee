benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
FooterView = require '../view'

describe 'FooterView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      benv.render require.resolve('../template.jade'), {}, =>
        @view = new FooterView el: $('#main-layout-footer')
        done()

  afterEach ->
    benv.teardown()

  it 'knows what year it is', ->
    @view.$el.html().should.containEql new Date().getFullYear()
