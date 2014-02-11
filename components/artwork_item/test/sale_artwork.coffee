benv            = require 'benv'
sinon           = require 'sinon'
Backbone        = require 'backbone'
SaleArtworkView = require '../views/sale_artwork'
mediator        = require '../../../lib/mediator'
{ fabricate }   = require 'antigravity'
{ resolve }     = require 'path'

model           = new Backbone.Model(id: 'artwork')
model.isSaved   = sinon.stub()

artworkCollection               = new Backbone.Collection
artworkCollection.unsaveArtwork = sinon.stub()
artworkCollection.saveArtwork   = sinon.stub()

describe 'SaleArtworks', ->
  xdescribe '#save', ->
    beforeEach (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        Backbone.$ = $
        benv.render resolve(__dirname, '../templates/artwork.jade'), { displayPurchase: true }, =>
          @view = new SalArtworkView
            el: $('.overlay-container')
            model: fabricate('artwork', { acquireable: true, sale_artwork: fabricate('sale_artwork') })
          done()

    afterEach ->
      benv.teardown()

    it 'sets up the save controls', ->
      sinon.spy mediator, 'trigger'
      @view.$('.overlay-button-save').click()
      mediator.trigger.args[0][0].should.equal 'open:auth'
      mediator.trigger.args[0][1].mode.should.equal 'register'
      mediator.trigger.restore()

    it 'has a working buy button', ->

    describe 'logged in behavior', ->
      beforeEach (done) ->
        benv.setup =>
          benv.expose { $: benv.require 'jquery' }
          Backbone.$ = $
          benv.render resolve(__dirname, '../templates/artwork.jade'), { displayPurchase: true }, =>
            @view = new SalArtworkView
              el: $('.overlay-container')
              model: fabricate('artwork', { acquireable: true, sale_artwork: fabricate('sale_artwork') })
            done()

      afterEach ->
        benv.teardown()

      it 'sets up save controls', ->
        @view.model.isSaved = -> false
        @view.$button.click()
        @view.model.isSaved = -> true

      it 'sets up a working buy button', ->

