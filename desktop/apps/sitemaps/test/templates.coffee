_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
{ fabricate } = require 'antigravity'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
Artwork = require '../../../models/artwork'
Section = require '../../../models/section'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'cities sitemap template', ->

  it 'renders the correct city show URLs', ->
    xml = render('cities')
      citySlugs: ['new-york', 'tokyo']
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/shows/new-york'
    xml.should.containEql 'www.artsy.net/shows/tokyo'

describe 'misc sitemap template', ->

  it 'renders the correct misc URLs', ->
    xml = render('misc')
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql '<loc>www.artsy.net</loc><priority>1</priority>'
    xml.should.containEql 'www.artsy.net/about'
    xml.should.containEql '/press/in-the-media'
    xml.should.containEql '/press/press-releases'
    xml.should.containEql '/collect'
    xml.should.containEql '/log_in'
    xml.should.containEql '/security'
    xml.should.containEql '/privacy'
    xml.should.containEql '/shows'
    xml.should.containEql '/artists'
    xml.should.containEql '/categories'
    xml.should.containEql '/sign_up'
    xml.should.containEql '/terms'

describe 'news sitemap template', ->

  it 'renders article info', ->
    xml = render('news')
      articles: [new Article fabricate 'article']
    xml.should.containEql 'https://www.artsy.net/article/editorial-on-the-heels-of-a-stellar-year'
    xml.should.containEql '<news:name>Artsy</news:name>'
    xml.should.containEql '2014-09-24T23:24:54.000Z'
    xml.should.containEql 'On The Heels of A Stellar Year in the West, Sterling Ruby Makes His Vivid Mark on Asia'
