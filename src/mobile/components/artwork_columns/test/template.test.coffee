Artwork = require '../../../models/artwork'
Artworks = require '../../../collections/artworks'
Partner = require '../../../models/partner'
cheerio = require 'cheerio'
{ fabricate } = require '@artsy/antigravity'
path = require 'path'
fs = require 'fs'
jade = require 'jade'

render = (locals) ->
  filename = path.resolve __dirname, "../template.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  ) locals

describe 'artwork_columns component', ->
  it 'renders basic artwork columns', ->
    artworks = new Artworks([
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
    ])
    $ = cheerio.load render(artworkColumns: [artworks.models])
    $('.artwork-columns-artwork').length.should.eql 2

  it 'renders contact gallery for inquireable artworks', ->
    artworks = new Artworks([
      new Artwork fabricate('artwork', inquireable: true)
    ])
    $ = cheerio.load render(artworkColumns: [artworks.models])
    $.html().should.containEql('Contact Gallery')

  it 'does not render contact gallery for non-inquireable artworks', ->
    artworks = new Artworks([
      new Artwork fabricate('artwork', inquireable: false)
    ])
    $ = cheerio.load render(artworkColumns: [artworks.models])
    $.html().should.not.containEql('Contact Gallery')

  it 'does not render contact gallery for auction artworks', ->
    artworks = new Artworks([
      new Artwork fabricate('artwork',
        forsale: true,
        inquireable: true,
        partner: fabricate('partner', type: 'Auction')
      )
    ])
    $ = cheerio.load render(artworkColumns: [artworks.models])
    $.html().should.containEql('Bid now')
    $.html().should.not.containEql('Contact Gallery')
