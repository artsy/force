SaleArtwork = require '../../../models/sale_artwork'
Artworks = require '../../../collections/artworks'
{ fabricate } = require 'antigravity'
path = require 'path'
fs = require 'fs'
pug = require 'pug'

render = (locals) ->
  filename = path.resolve __dirname, '../template.pug'
  pug.compile(
    fs.readFileSync(filename),
    { filename: filename }
  ) locals

describe 'artwork_list component', ->

  it 'renders markdown from sales', ->
    artworks = new Artworks fabricate 'artwork',
      sale_artwork: user_notes: '**Lovely!**'
    render(artworks: artworks.models).should.containEql '<strong>Lovely!</strong>'
