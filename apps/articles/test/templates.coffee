_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
Vertical = require '../../../models/vertical'
fixtures = require '../../../test/helpers/fixtures'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'article show template', ->

  it 'renders sectionless articles', ->
    html = render('show')
      article: new Article title: 'hi', sections: []
      footerArticles: new Articles
      crop: (url) -> url
      moment: moment
      sd: {}
      asset: ->
    html.should.containEql 'hi'

  it "renders a vertical article's related footers and stickies", ->
    html = render('show')
      article: new Article title: 'hi', sections: [], vertical_id: '92094'
      footerArticles: new Articles
      vertical: new Vertical _.extend _.clone(fixtures.vertical),
        title: 'Moo Bar'
      featuredVerticalArticles: new Articles([_.extend(fixtures.article,
        thumbnail_title: 'Featured Vertical Article Title')])
      allVerticalArticles: new Articles([_.extend(fixtures.article,
        thumbnail_title: 'Vertical Article Title')])
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd: {}
      asset: ->
    html.should.containEql 'More From Moo Bar'
    html.should.containEql 'Featured Vertical Article Title'
    html.should.containEql 'Vertical Article Title'

  it "renders related footer articles", ->
    html = render('show')
      article: new Article title: 'hi', sections: []
      footerArticles: new Articles [_.extend(_.clone(fixtures.article),
        thumbnail_title: "This is a footer article"
        vertical_id: null)]
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd: {}
      asset: ->
    html.should.containEql 'This is a footer article'

describe 'article figure template', ->

  it 'uses the article url', ->
    html = render('full_feed')
      articles: new Articles([_.extend(fixtures.article, slug: 'foobar')])
      crop: (url) -> url
      moment: moment
      sd: {}
    html.should.containEql '/article/foobar'

describe 'vertical template', ->

  it 'renders the vertical title', ->
    html = render('vertical')
      articles: new Articles([_.extend(fixtures.article, slug: 'foobar')])
      crop: (url) -> url
      moment: moment
      sd: {}
      asset: ->
      vertical: new Vertical _.extend _.clone(fixtures.vertical),
        title: 'Moo Bar'
    html.should.containEql 'Moo Bar'
