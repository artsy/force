jade = require 'jade'
path = require 'path'
cheerio = require 'cheerio'
fs = require 'fs'
{ fabricate } = require '@artsy/antigravity'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'filter template', ->
  it 'it renders 0 works when there are zero artworks', ->
    html = render('template')({
      total: null
      infiniteScroll: false
      pulldownVal: 'foo'
    })

    $ = cheerio.load html

    $('.filter-sort-count-total').html().should.containEql '0 works'
