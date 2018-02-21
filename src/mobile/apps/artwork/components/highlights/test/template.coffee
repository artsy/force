_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
highlights = require './fixture.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork highlights templates', ->
  beforeEach ->
    @artwork = fabricate 'artwork'

  describe 'artwork with highlights', ->
    beforeEach ->
      @artwork.highlights = highlights

      @html = render('index')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

      @$ = cheerio.load(@html)

    it 'should contain a link to show', ->
      @$('.artwork-highlight-module__image a').filter('[data-type=HighlightedShow]').attr('href').should.equal '/show/retrospective'

    it 'it should contain a show image', ->
      @$('.artwork-highlight-module__image a img').filter('[data-type=HighlightedShow]').attr('src').should.equal 'show_img.png'
      @$('.artwork-highlight-module__image a img').filter('[data-type=HighlightedShow]').attr('width').should.equal '100'
      @$('.artwork-highlight-module__image a img').filter('[data-type=HighlightedShow]').attr('height').should.equal '58'

    it 'displays show details', ->
      @$('.artwork-highlight-module__details__partner').text().should.equal 'Museum of Modern Art'
      @$('.title__date .artwork-highlight-module__details__title a').attr('href').should.equal '/show/retrospective'
      @$('.title__date .artwork-highlight-module__details__title a').text().should.equal 'Marcel Broodthaers: A Retrospective'
      @$('.artwork-highlight-module__details__location-date').text().should.equal 'New York, Feb 14 – May 15'

    it 'should contain a link to article', ->
      @$('.artwork-highlight-module__image a').filter('[data-type=HighlightedArticle]').attr('href').should.equal '/article/the-african-art-fair-2015'

    it 'should contain an article image', ->
      @$('.artwork-highlight-module__image a img').filter('[data-type=HighlightedArticle]').attr('src').should.equal 'article_img.png'
      @$('.artwork-highlight-module__image a img').filter('[data-type=HighlightedArticle]').attr('width').should.equal '100'
      @$('.artwork-highlight-module__image a img').filter('[data-type=HighlightedArticle]').attr('height').should.equal '100'

    it 'displays article details', ->
      @$('.title__author .artwork-highlight-module__details__title a').attr('href').should.equal '/article/the-african-art-fair-2015'
      @$('.title__author .artwork-highlight-module__details__title a').text().should.equal '5 Trends at 1:54'
      @$('.artwork-highlight-module__details__author').first().text().should.equal 'The Art Genome Project'
