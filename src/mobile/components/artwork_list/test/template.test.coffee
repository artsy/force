SaleArtwork = require '../../../models/sale_artwork'
Artworks = require '../../../collections/artworks'
{ fabricate } = require '@artsy/antigravity'
path = require 'path'
fs = require 'fs'
jade = require 'jade'

render = (locals) ->
  filename = path.resolve __dirname, '../template.jade'
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  ) locals

describe 'artwork_list component', ->

  it 'renders markdown from sales', ->
    artworks = new Artworks fabricate 'artwork',
      sale_artwork: user_notes: '**Lovely!**'
    render(artworks: artworks.models).should.containEql '<strong>Lovely!</strong>'
