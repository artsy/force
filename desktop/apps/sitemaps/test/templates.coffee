_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
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

describe 'artwork sitemap template', ->

  it 'renders the correct artwork URLs', ->
    xml = render('artworks')
      models: new Artworks([fabricate 'artwork', id: 'foobar']).models
      _: _
      sd: {}
    xml.should.containEql '/artwork/foobar'

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
