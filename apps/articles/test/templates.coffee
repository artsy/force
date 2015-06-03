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

  it 'renders extra stickies if featured ones are missing', ->
    html = render('vertical')
      articles: new Articles([_.extend(fixtures.article, tier: 1)])
      crop: (url) -> url
      moment: moment
      sd: {}
      asset: ->
      vertical: new Vertical _.extend _.clone(fixtures.vertical),
        title: 'Moo Bar'
    html.should.containEql '<li class="grid-item"><a href="/article/foobar">'

describe 'show template', ->

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

  it 'renders extra stickies if featured ones are missing and article is part of a vertical', ->
    html = render('show')
      article: new Article title: 'hi', sections: [], vertical_id: '55356a9deca560a0137aa4b7'
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd: {}
      asset: ->
      vertical: new Vertical _.extend _.clone(fixtures.vertical), title: 'Moo Bar'
      allVerticalArticles: new Articles([_.extend(fixtures.article, tier: 1)])
    html.should.containEql '<li class="grid-item"><a href="/article/foobar">'