$ = require 'cheerio'
_ = require 'underscore'
fs = require 'fs'
jade = require 'jade'
{ fabricate } = require 'antigravity'
ArtistsByLetter = require '../collections/artists_by_letter'

render = (template) ->
  filename = require.resolve "../templates/#{template}.jade"
  jade.compile fs.readFileSync(filename), filename: filename

describe 'Artists', ->
  describe '#index', ->
    before ->
      @html = render('index') _.extend require('./fixtures/artists').data,
        letters: ArtistsByLetter::range
        asset: (->)
        sd: {}

      @$ = $.load @html

    it 'renders the alphabetical nav', ->
      @$('body').html().should.not.containEql 'undefined'
      @$('.alphabetical-index-range').text().should.equal 'abcdefghijklmnopqrstuvwxyz'

    it 'has a single <h1> that displays the name of the artists set', ->
      $h1 = @$('h1')
      $h1.length.should.equal 1
      $h1.text().should.equal 'Featured Artists'

    it 'renders the featured artists', ->
      @$('.afc-artist-name').map(-> $(this).text()).get()
        .should.eql [
          'Kamrooz Aram'
          'Tina Barney'
          'Sarah Braman'
          'Aaron Sandnes'
        ]

    it 'renders the gene sets', ->
      @$('.artists-featured-genes-gene').should.have.lengthOf 10

    it 'renders 4 trending artists for each gene', ->
      @$('.afg-artist').should.have.lengthOf 40

    it 'has jump links to the various gene pages', ->
      $links = @$('.avant-garde-jump-link')
      $links.length.should.equal 10
      $links.first().text().should.equal 'Emerging Art'

    it 'uses four_thirds images', ->
      @$('.afg-artist img').attr('src').should.containEql 'four_thirds'

  describe 'letter page', ->
    before ->
      artists = [
        fabricate 'artist', image_versions: ['four_thirds', 'tall']
        fabricate 'artist', image_versions: ['four_thirds', 'tall']
      ]

      @artistsByLetter = new ArtistsByLetter artists,
        letter: 'a', state: currentPage: 1, totalRecords: 1000

      template = render('letter')
        sd:
          CANONICAL_MOBILE_URL: 'http://localhost:5000'
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/artists-starting-with-a'
        letter: 'A'
        letterRange: ['a', 'b', 'c']
        artists: @artistsByLetter
        asset: (->)

      @$ = $.load template

    it 'renders the alphabetical nav', ->
      @$.html().should.not.containEql 'undefined'
      @$('.alphabetical-index-range').text().should.equal 'abc'

    it 'has a single <h1> that displays the name of the artists set', ->
      $h1 = @$('h1')
      $h1.length.should.equal 1
      $h1.text().should.equal 'Artists – A'

    it 'includes meta tags', ->
      html = @$.html()
      html.should.containEql '<link rel="next" href="http://localhost:5000/artists-starting-with-a?page=2"'
      html.should.containEql '<meta property="og:title" content="Artists Starting With A'
      html.should.containEql '<meta property="og:description" content="Research and discover artists starting with A on Artsy. Find works for sale, biographies, CVs, and auction results'
