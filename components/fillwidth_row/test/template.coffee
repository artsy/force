jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Artwork         = require '../../../models/artwork'

render = ->
  filename = path.resolve __dirname, "../template.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Fillwidth row', ->
  describe 'artwork with a partner and a collecting institution field', ->
    beforeEach ->
      @artworks = [new Artwork fabricate 'artwork', { collecting_institution: 'House of Bitty' }]
      @template = render('index')(
        sd: {}
        artworks: @artworks
      )

    it 'correctly renders and displays the partner name', ->
      @template.should.include 'House of Bitty'

  describe 'artwork with a partner', ->
    beforeEach ->
      @artworks = [new Artwork fabricate 'artwork']
      @template = render('index')(
        sd: {}
        artworks: @artworks
      )

    it 'correctly renders and displays the partner name', ->
      @template.should.include 'MOMA'

  describe 'artwork with no partner and a stale collecting institution field', ->
    beforeEach ->
      @artworks = [new Artwork fabricate 'artwork', { collecting_institution: 'House of Bitty', partner: null }]
      @template = render('index')(
        sd: {}
        artworks: @artworks
      )

    it 'correctly renders and does not display the partner name', ->
      @template.should.not.include 'House of Bitty'