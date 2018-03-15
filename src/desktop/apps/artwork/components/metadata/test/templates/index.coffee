_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'

render = ->
  filename = path.resolve __dirname, "../../index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'metadata template', ->
  describe 'when attribution_class is present', ->
    it 'displays the short description', ->
      @artwork = fabricate('artwork', {
        attribution_class: {
          short_description: "One of a kind"
        }
      })

      @html = render()(
        artwork: @artwork
        helpers: {
          partner_stub:
            contacts: sinon.stub()
            location: sinon.stub()
            artistIds: sinon.stub()
        }
        asset: (->)
        sd: {}
      )

      @$ = cheerio.load(@html)
      @$('.artwork-metadata__attribution-class').html().should.equal 'One of a kind'

  describe 'when attribution_class is absent', ->
    it 'does not display the field at all', ->
      @artwork = fabricate('artwork', {
        attribution_class: null
      })

      @html = render()(
        artwork: @artwork
        helpers: {
          partner_stub:
            contacts: sinon.stub()
            location: sinon.stub()
            artistIds: sinon.stub()
        }
        asset: (->)
        sd: {}
      )

      @$ = cheerio.load(@html)
      @$('.artwork-metadata__attribution-class').length.should.equal 0
