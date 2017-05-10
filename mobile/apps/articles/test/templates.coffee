_ = require 'underscore'
fs = require 'fs'
jade = require 'jade'
path = require 'path'
cheerio = require 'cheerio'
Backbone = require 'backbone'
{ resolve } = require 'path'
Article = require '../../../models/article'
Section = require '../../../models/section'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'section template', ->

  it 'renders the section title', ->
    @Articles = new Articles
    @Articles.model = Article
    @Articles.add([_.extend(_.clone(fixtures.article), slug: 'foobar')])

    html = render('section')
      articles: @Articles
      crop: (url) -> url
      sd: {}
      asset: ->
      featuredSection: new Section _.extend _.clone(fixtures.section), title: 'Moo Bar'

    html.should.containEql 'Moo Bar'

  it 'links to the section website', ->
    @Articles = new Articles
    @Articles.model = Article
    @Articles.add([
        _.extend(_.clone(fixtures.article), id: 'foo', title: 'Foo and Bars are Great!')
        _.extend(_.clone(fixtures.article), id: 'bar')
        _.extend(_.clone(fixtures.article), id: 'baz')
      ])

    section = new Section _.extend _.clone(fixtures.section),
        title: 'Moo Bar'
        partner_website_url: 'www.foobar.com'

    html = render('section')
      articles: @Articles
      crop: (url) -> url
      sd: {}
      asset: ->
      featuredSection: section

    $ = cheerio.load html
    $('.articles-section-header__banner a').attr('href').should.equal 'www.foobar.com'

  it 'renders the Venice 2017 banner', ->
    @Articles = new Articles
    @Articles.model = Article
    @Articles.add([_.extend(_.clone(fixtures.article), slug: 'foobar')])

    html = render('section')
      articles: @Articles
      crop: (url) -> url
      sd: {}
      asset: ->
      veniceBanner: true
      featuredSection: new Section
    html.should.containEql 'venice-redirect-banner--articles'
