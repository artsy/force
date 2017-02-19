_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
artists = require './fixture.coffee'
Helpers = require '../../../helpers.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork artist templates -', ->
  beforeEach ->
    @artwork = fabricate 'artwork'

  describe 'artwork with a featured bio submitted by that partner', ->
    beforeEach ->
      @artwork.artists = artists
      @artwork.partner = { id: 'catty-partner' }
      @html = render('index')(
        artwork: @artwork
        sd: {}
        asset: (->)
        helpers: Helpers
        _: _
      )

      @$ = cheerio.load(@html)

    it 'should display artist bio', ->
      text = @$('.aama-tab-content').filter("[data-id=biography-#{artists[0].id}]").first().text()
      text.should.containEql 'Picasso was a cat'
      text.should.containEql 'Submitted by Catty Partner'

  describe 'artwork with artist', ->
    beforeEach ->
      @artwork.artists = artists

      @html = render('index')(
        artwork: @artwork
        sd: {}
        asset: (->)
        helpers: Helpers
        _: _
      )

      @$ = cheerio.load(@html)

    it 'should display artist label', ->
      @$('.artwork-artist-name').first().text().should.equal 'Pablo Picasso'
      @$('.artwork-artist-works').first().text().should.equal '20 works, 8 for sale'

    it 'should display artist bio', ->
      @$('.aama-tab-content').filter("[data-id=biography-#{artists[0].id}]").first().text().should.equal "This is Picasso's bio."

    it 'should display artist overview', ->
      @$('.aama-tab-content').filter("[data-id=overview-#{artists[0].id}]").first().text().should.equal " Born 1970, New York, New York, and based in Paris"

    it 'should display artist image', ->
      @$('.artwork-artist-module__images').first().children().length.should.equal 3
      @$('.artwork-artist-module__images-item img:first-child').first().attr('src').should.equal 'some_img.png'
      @$('.artwork-artist-module__images-item img:first-child').first().attr('src').should.equal 'some_img.png'
      @$('.artwork-artist-module__images-item img:last-child').last().attr('src').should.equal 'square.png'

    it 'should display artists - plural', ->
      @$('.artwork-artist-module__section-title').text().should.equal 'About the Artists'

    it 'displays exhibition history', ->
      @$('.artwork-artist-module__content__exhibition-highlights__item__date').first().text().should.equal '2016'
      @$('.artwork-artist-module__content__exhibition-highlights__item__text').last().text().should.equal 'A Warhol Show, The Goog'

  describe 'artist with one artwork', ->
    beforeEach ->
      @artwork.artists = [
        fabricate('artist', carousel: { image: null }, counts: { artworks: 1 })
      ]

      @html = render('index')(
        artwork: @artwork
        sd: {}
        asset: (->)
        _: _
      )

      @$ = cheerio.load(@html)

    it 'should display artist singular form for works', ->
      @$('.artwork-artist-works').first().text().should.equal '1 work'

  describe 'artist with one artwork and one for sale artwork', ->
    beforeEach ->
      @artwork.artists = [
        fabricate('artist', carousel: { image: null }, counts: { artworks: 1, for_sale_artworks: 1 })
      ]

      @html = render('index')(
        artwork: @artwork
        sd: {}
        asset: (->)
        _: _
      )

      @$ = cheerio.load(@html)

    it 'should display artist singular form for works - for sale', ->
      @$('.artwork-artist-works').first().text().should.equal '1 work for sale'

