_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'article show template', ->

  it 'renders sectionless articles', ->
    html = render('index')
      article: new Article title: 'hi', sections: [], section_ids: []
      footerArticles: new Articles
      crop: (url) -> url
      moment: moment
      sd: {}
      asset: ->
    html.should.containEql 'hi'

  it 'renders static split test', ->
    html = render('index')
      article: new Article title: 'hi', sections: [], section_ids: []
      footerArticles: new Articles
      crop: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
      asset: ->
    html.should.containEql 'article-share-fixed'
    html.should.not.containEql 'articles-footer'

  it 'renders infinite scroll split test', ->
    html = render('index')
      article: new Article title: 'hi', slug: 'foo', sections: [], section_ids: []
      crop: (url) -> url
      moment: moment
      sd: 
        CURRENT_PATH: 'bar'
        SCROLL_ARTICLE: 'infinite'
      asset: ->
    html.should.containEql 'foo'
    html.should.not.containEql 'bar'
