_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
{ fabricate } = require '@artsy/antigravity'
getFullEditorialHref = require("@artsy/reaction/dist/Components/Publishing/Constants").getFullEditorialHref
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
    articles = [
      new Article(fabricate('article', layout: 'standard'))
      new Article(fabricate('article', layout: 'news', slug: "banksys-half-shredded-painting-will-view-german-museum"))
    ]

    xml = render('news')(articles: articles, getFullEditorialHref: getFullEditorialHref)

    xml.should.containEql '/article/editorial-on-the-heels-of-a-stellar-year'
    xml.should.containEql '/news/banksys-half-shredded-painting-will-view-german-museum'
    xml.should.containEql '<news:name>Artsy</news:name>'
    xml.should.containEql '2014-09-24T23:24:54.000Z'
    xml.should.containEql 'On The Heels of A Stellar Year in the West, Sterling Ruby Makes His Vivid Mark on Asia'
