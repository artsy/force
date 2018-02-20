_ = require 'underscore'
_s = require 'underscore.string'
cheerio = require 'cheerio'
embed = require 'particle'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
markdown = require '../../../components/util/markdown'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'super_article_sticky_header', ->
  it 'superSubArticles can render fullscreen header and SA menu with correct classes', ->
    html = render('super_article_sticky_header')
      article:
        title: 'hi'
        sections: []
        contributing_authors: []
        is_super_article: true
        hero_section:
          type: 'fullscreen'
          url: 'http://image.jpg'
      superArticle: new Article
        super_article:
          partner_logo: 'http://logo.jpg'
          partner_logo_link: 'http://logo.com'
      superSubArticles: {models: []}
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
    html.should.containEql 'article-sa-sticky-header'
    html.should.containEql '<a href="http://logo.com"><img src="http://logo.jpg"/>'
    html.should.not.containEql 'visible no-transition'

  it 'super articles show nav when they do not have a fullscreen hero', ->
    html = render('super_article_sticky_header')
      article: new Article
        title: 'Super Article Title'
        sections: []
        contributing_authors: []
        is_super_article: true
      footerArticles: new Articles
      superArticle: new Article
        super_article: {}
      superSubArticles: new Articles
      crop: ->
      resize: ->
      moment: moment
      sd: {}
      asset: ->
      markdown: markdown
    html.should.containEql 'visible no-transition'

describe 'super_article_footer', ->
  it 'super articles have markdown-supported footers', ->
    html = render('super_article_footer')
      article: new Article
        title: 'Super Article Title'
        sections: []
        contributing_authors: []
        is_super_article: true
      footerArticles: new Articles
      superArticle: new Article
        super_article:
          partner_logo: 'http://logo.jpg'
          partner_logo_link: 'http://logo.com'
          partner_fullscreen_header_logo: 'http://fullscreen-logo.jpg'
          footer_blurb: 'Article Test [Link](http://artsy.net)'
      superSubArticles: new Articles
      crop: ->
      resize: ->
      moment: moment
      sd: {}
      asset: ->
      markdown: markdown
    html.should.containEql '<a href="http://artsy.net">Link</a>'

  it 'super articles display a footer_title', ->
    html = render('super_article_footer')
      article:
        title: 'Super Article Title'
        sections: []
        contributing_authors: []
        is_super_article: true
      superArticle: new Article
        super_article:
          footer_title: 'Footer Title'
      superSubArticles: new Articles
      crop: ->
      resize: ->
      moment: moment
      sd: {}
      asset: ->
      markdown: markdown
    html.should.containEql 'Footer Title'

  it 'super articles fallback on the title when there is no footer_title', ->
    html = render('super_article_footer')
      article:
        sections: []
        contributing_authors: []
        is_super_article: true
      footerArticles: new Articles
      superArticle: new Article
        title: 'Super Article Title'
        super_article:
          footer_title: ''
      superSubArticles: new Articles
      crop: ->
      resize: ->
      moment: moment
      sd: {}
      asset: ->
      markdown: markdown
    html.should.containEql 'Super Article Title'
