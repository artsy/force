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
Artworks = require '../../../collections/artworks'
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

describe 'artwork template', ->

  it 'renders the correct artwork URLs', ->
    xml = render('artworks')
      models: new Artworks([fabricate 'artwork', id: 'foobar']).models
      _: _
      sd: {}
    xml.should.containEql '/artwork/foobar'

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
    xml.should.containEql 'www.artsy.net/gene/pop-art9'

describe 'image sitemap template', ->

  it 'renders the correct image URLs', ->
    xml = render('images')
      models: new Artworks([fabricate('artwork', {
        images:
          [{image_urls: {
            medium: 'https://d32dm0rphc51dk.cloudfront.net/foo.jpg'
            small: 'baz.jpg'
            }
          }]
        })
      ]).models
      _: _
      sd: {}
    xml.should.containEql 'https://d32dm0rphc51dk.cloudfront.net/foo.jpg'

  it 'renders the correct caption data', ->
    xml = render('images')
       models: new Artworks([fabricate 'artwork', title: 'Moo']).models
      _: _
      sd: {}
    xml.should.containEql 'Moo'

  it 'does not include images for which imageUrl() is undefined', ->
    xml = render('images')
       models: new Artworks([fabricate 'artwork', id: 'james', images: undefined]).models
      _: _
      sd: {}
    xml.should.not.containEql 'james'

describe 'images index sitemap template', ->

  it 'renders the correct image page URLs', ->
    xml = render('images_index')
      artworkBuckets: [{ pages: 2, startDate: '2010-09-01' }, { pages: 2, startDate: '2010-10-01' }]
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/sitemap-images-1-2010-09-01.xml'
    xml.should.containEql 'www.artsy.net/sitemap-images-2-2010-09-01.xml'
    xml.should.containEql 'www.artsy.net/sitemap-images-1-2010-10-01.xml'
    xml.should.containEql 'www.artsy.net/sitemap-images-2-2010-10-01.xml'

describe 'index sitemap template', ->

  it 'renders the correct feature URLs', ->
    xml = render('features')
      models: [fabricate 'feature']
      _: _
      sd: APP_URL: 'www.artsy.net'
    xml.should.containEql 'www.artsy.net/feature/bitty-the-cat'

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
    xml.should.containEql '<loc>www.artsy.net/gagosian44</loc>'
    xml.should.containEql 'www.artsy.net/gagosian44/shows'
    xml.should.containEql 'www.artsy.net/gagosian44/artists'
    xml.should.containEql 'www.artsy.net/gagosian44/articles'
    xml.should.containEql 'www.artsy.net/gagosian44/contact'
    xml.should.containEql 'www.artsy.net/gagosian44/shop'
    xml.should.containEql 'www.artsy.net/gagosian44/collection'
    xml.should.containEql 'www.artsy.net/gagosian44/about'

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
    xml.should.containEql 'www.artsy.net/show/gagosian-gallery-inez-and-vinoodh45'

describe 'video sitemap template', ->

  it 'renders the correct video info', ->
    xml = render('video')
      articles: new Articles fabricate 'article', sections: [
        type: 'video'
        url: 'http://youtube.com/video'
      ]
      sd: APP_URL: 'www.artsy.net'
      moment: moment
    xml.should.containEql 'www.artsy.net/article/editorial-on-the-heels-of-a-stellar-year'
    xml.should.containEql '<video:player_loc>http://youtube.com/video</video:player_loc>'
    xml.should.containEql '2014-09-24T07:24:54-04:00'
