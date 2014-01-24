# rewire        = require 'rewire'
# benv          = require 'benv'
# Backbone      = require 'backbone'
# sinon         = require 'sinon'
# { resolve }   = require 'path'
# ZoomView      = rewire '../zoom'

# ZoomView.__set__ 'Image', -> { width: 500, height: 500 }
# ZoomView.__set__ 'ModalView', Backbone.View

describe 'ZoomView', ->
  # beforeEach (done) ->
  #   benv.setup =>
  #     benv.expose { $: benv.require 'jquery' }
  #     Backbone.$ = $
  #     benv.render resolve(__dirname, '../template.jade'), {}, =>
  #       @view = new ZoomView imgSrc: 'foobar.jpg'
  #       done()

  # afterEach ->
  #   @view.close()
  #   benv.teardown()

  it 'sets the width of the modal to be the width of the image'
