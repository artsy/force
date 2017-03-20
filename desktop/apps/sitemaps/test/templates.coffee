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

describe 'articles template', ->

  it 'renders article urls', ->
    xml = render('articles')
      slugs: ['artsy-editorial-1', 'artsy-editorial-2']
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/article/artsy-editorial-1'
    xml.should.containEql 'www.artsy.net/article/artsy-editorial-2'

describe 'artists template', ->

  it 'renders artist pages and related links', ->
    xml = render('artists')
      models: [{id: 'andy-warhol'}, {id: 'roy-lichtenstein'}]
      sd: APP_URL: 'www.artsy.net'
      _: _
    xml.should.containEql 'www.artsy.net/artist/andy-warhol'
    xml.should.containEql 'www.artsy.net/artist/andy-warhol/shows'
    xml.should.containEql 'www.artsy.net/artist/andy-warhol/related-artists'
    xml.should.containEql 'www.artsy.net/artist/andy-warhol/auction-results'
    xml.should.containEql 'www.artsy.net/artist/roy-lichtenstein'
    xml.should.containEql 'www.artsy.net/artist/roy-lichtenstein/shows'
    xml.should.containEql 'www.artsy.net/artist/roy-lichtenstein/related-artists'
    xml.should.containEql 'www.artsy.net/artist/roy-lichtenstein/auction-results'

describe 'cities sitemap template', ->

  it 'renders the correct city show URLs', ->
    xml = render('cities')
      citySlugs: ['new-york', 'tokyo']
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/shows/new-york'
    xml.should.containEql 'www.artsy.net/shows/tokyo'

describe 'fairs sitemap template', ->

  it 'renders the correct fair URLs', ->
    xml = render('fairs')
      models: [fabricate 'fair', has_full_feature: true]
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/the-armory-show'
    xml.should.containEql 'www.artsy.net/the-armory-show/browse/booths'
    xml.should.containEql 'www.artsy.net/the-armory-show/articles'
    xml.should.containEql 'www.artsy.net/the-armory-show/info'

describe 'features sitemap template', ->

  it 'renders the correct feature URLs', ->
    xml = render('features')
      models: [fabricate 'feature']
      _: _
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/feature/bitty-the-cat'

describe 'gene sitemap template', ->

  it 'renders the correct gene URLs', ->
    xml = render('genes')
      models: [fabricate 'gene']
      _: _
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/gene/pop-art'

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
    xml = render('news_sitemap')
      articles: [new Article fabricate 'article']
    xml.should.containEql 'https://www.artsy.net/article/editorial-on-the-heels-of-a-stellar-year'
    xml.should.containEql '<news:name>Artsy</news:name>'
    xml.should.containEql '2014-09-24T23:24:54.000Z'
    xml.should.containEql 'On The Heels of A Stellar Year in the West, Sterling Ruby Makes His Vivid Mark on Asia'

describe 'partners sitemap template', ->

  it 'renders the correct partner URLs', ->
    xml = render('partners')
      models: [fabricate 'partner']
      _: _
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql '<loc>www.artsy.net/gagosian'
    xml.should.containEql '/shows'
    xml.should.containEql '/artists'
    xml.should.containEql '/articles'
    xml.should.containEql '/contact'
    xml.should.containEql '/shop'
    xml.should.containEql '/collection'
    xml.should.containEql '/about'

describe 'profiles sitemap template', ->

  it 'renders the correct feature URLs', ->
    xml = render('profiles')
      models: [fabricate 'profile']
      _: _
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/alessandra'

describe 'shows sitemap template', ->

  it 'renders the correct show URLs', ->
    xml = render('shows')
      models: [fabricate 'show']
      _: _
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/show/gagosian-gallery-inez-and-vinoodh'

describe 'video sitemap template', ->

  it 'renders the correct video info', ->
    xml = render('video')
      articles: new Articles fabricate 'article', published_at: '2014-09-02', sections: [
        type: 'video'
        url: 'http://youtube.com/video'
      ]
      sd: APP_URL: 'www.artsy.net'
      moment: moment
    xml.should.containEql 'www.artsy.net/article/editorial-on-the-heels-of-a-stellar-year'
    xml.should.containEql '<video:player_loc>http://youtube.com/video</video:player_loc>'
    xml.should.containEql '2014-09-02'
