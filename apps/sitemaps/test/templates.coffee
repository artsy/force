_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
Artwork = require '../../../models/artwork'
Artworks = require '../../../collections/artworks'
Section = require '../../../models/section'
fixtures = require '../../../test/helpers/fixtures'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'articles sitemap template', ->

  it 'renders the correct article URLs', ->
    xml = render('articles')
      articles: new Articles([_.extend(fixtures.article, slug: 'foobar')])
      crop: (url) -> url
      moment: moment
      sd: {}
    xml.should.containEql '/article/foobar'




