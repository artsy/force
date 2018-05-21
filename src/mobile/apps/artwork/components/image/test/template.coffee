_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork image templates', ->

  beforeEach ->
    @artwork = fabricate 'artwork', artists: [fabricate 'artist']

    @html = render('index')(
      artwork: @artwork
      sd: {}
      asset: (->)
    )

  it 'displays carousel when there are multiple images', ->
    @html.should.containEql 'artwork-carousel'

  it 'contain artist\'s name', ->
    $ = cheerio.load(@html)
    $('.artist-name').text().should.equal 'Pablo Picasso'

  it 'contains artwork display label', ->
    $ = cheerio.load(@html)
    $('.artwork-display').text().should.equal 'Skull, 1999'

describe 'Artwork image templates', ->

  beforeEach ->
    @artwork = fabricate 'artwork', { artists: [], cultural_maker: 'Kanye West' }

    @html = render('index')(
      artwork: @artwork
      sd: {}
      asset: (->)
    )

  it 'displays cultural_maker when there is not artist', ->
    $ = cheerio.load(@html)
    $('.artist-name').text().should.equal 'Kanye West'

describe 'Artwork image templates', ->
  beforeEach ->
    @artwork = fabricate 'artwork'

  describe 'artwork with attribution class', ->

    beforeEach ->
      @artwork.attribution_class = {
        short_description: 'This work is unique',
        long_description: 'Very detailed explanation of what unique means'
      }

      @html = render('index')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'displays attribution class short description', ->
      $ = cheerio.load(@html)
      $('.artwork-image-module__attribution-class a').text().should.equal 'This work is unique'

  describe 'artwork without attribution class', ->
    beforeEach ->
      @html = render('index')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'does not display attribution class container', ->
      $ = cheerio.load(@html)
      $('.artwork-image-module__attribution-class').length.should.equal 0

  describe 'medium, dimensions', ->
    before ->
      @html = render('details')(
        artwork: @artwork
        sd: {}
        asset: (->)
      )

    it 'displays medium and dimensions', ->
      @html.should.containEql 'Watercolor on Paper'
      @html.should.containEql '10 × 20 × 30in; 100 × 200 × 40cm'
