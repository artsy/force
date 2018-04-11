_ = require 'underscore'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
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


describe 'articles template', ->

  it 'shows the news panel if user is admin', ->
    html = render('articles')
      articles: new Articles([_.extend(fixtures.article, {slug: 'foobar', tier: 1})])
      asset: (url) -> url
      crop: (url) -> url
      moment: moment
      sd: { CURRENT_USER: { type: 'Admin'}}
    html.should.containEql 'news-panel'

  it 'shows featured articles if user is not admin', ->
    # TODO: Remove after news launches
    html = render('articles')
      articles: new Articles([_.extend(fixtures.article, {slug: 'foobar', tier: 1})])
      asset: (url) -> url
      crop: (url) -> url
      moment: moment
      sd: { CURRENT_USER: { type: 'foo'}}
    html.should.containEql 'am-featured-hero'
    html.should.not.containEql 'news-panel'

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
