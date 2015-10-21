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

  it 'renders share for static_fixed split test', ->
    html = render('index')
      article: new Article title: 'hi', sections: [], section_ids: []
      footerArticles: new Articles
      crop: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
        SHARE_ARTICLE: 'fixed'
      asset: ->
    html.should.containEql 'article-share-fixed'
    html.should.not.containEql 'article-social'

  it 'renders share for static_current_fixed split test', ->
    html = render('index')
      article: new Article title: 'hi', sections: [], section_ids: []
      footerArticles: new Articles
      crop: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
        SHARE_ARTICLE: 'current_fixed'
      asset: ->
    html.should.containEql 'article-share-fixed'
    html.should.containEql 'article-social'

  it 'renders share for static_current split test', ->
    html = render('index')
      article: new Article title: 'hi', sections: [], section_ids: []
      footerArticles: new Articles
      crop: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
        SHARE_ARTICLE: 'current'
      asset: ->
    html.should.not.containEql 'article-share-fixed'
    html.should.containEql 'article-social'
