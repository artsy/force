_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
Section = require '../../../models/section'
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

describe 'section template', ->

  it 'renders the section title', ->
    html = render('section')
      articles: new Articles([_.extend(fixtures.article, slug: 'foobar')])
      crop: (url) -> url
      moment: moment
      sd: {}
      asset: ->
      section: new Section _.extend _.clone(fixtures.section),
        title: 'Moo Bar'
    html.should.containEql 'Moo Bar'

  it 'renders extra stickies if featured ones are missing', ->
    html = render('section')
      articles: new Articles([_.extend(fixtures.article, tier: 1)])
      crop: (url) -> url
      moment: moment
      sd: {}
      asset: ->
      section: new Section _.extend _.clone(fixtures.section),
        title: 'Moo Bar'
    html.should.containEql '<li class="grid-item"><a href="/article/foobar">'

describe 'article template', ->

  it "renders related footer articles", ->
    html = render('article')
      article: new Article title: 'hi', sections: [], section_ids: []
      footerArticles: new Articles [_.extend(_.clone(fixtures.article),
        thumbnail_title: "This is a footer article"
        section_ids: [])]
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
        SHARE_ARTICLE: 'current'
      asset: ->
    html.should.containEql 'This is a footer article'

  it 'renders extra stickies if featured ones are missing and article is part of a section', ->
    html = render('article')
      article: new Article title: 'hi', sections: [], section_ids: ['55356a9deca560a0137aa4b7']
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
        SHARE_ARTICLE: 'current'
      asset: ->
      section: new Section _.extend _.clone(fixtures.section), title: 'Moo Bar'
      allSectionArticles: new Articles([_.extend(fixtures.article, tier: 1)])
    html.should.containEql '<li class="grid-item"><a href="/article/foobar">'