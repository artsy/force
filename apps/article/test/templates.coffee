_ = require 'underscore'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
Article = require '../../../models/article'
Channel = require '../../../models/channel'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'article template', ->

  it "renders a container for the footer", ->
    html = render('article')
      article: new Article
        title: 'hi'
        sections: []
        section_ids: []
        contributing_authors: []
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
      asset: ->
    html.should.containEql 'articles-footer'

  it "renders article sections", ->
    html = render('article')
      article: new Article
        title: 'hi'
        sections: [
          { type: 'text', body: 'Hello...' }
        ]
        section_ids: []
        contributing_authors: []
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
      asset: ->
    html.should.containEql 'Hello...'

  it 'renders a loading spinner for infinite scroll articles', ->
    html = render('article')
      article: new Article
        title: 'Title Page'
        sections: []
        contributing_authors: []
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'infinite'
      asset: ->
    html.should.containEql 'loading-spinner'

  it 'renders team channel articles', ->
    html = render('article')
      article: new Article
        title: 'Title page'
        sections: []
        contributing_authors: []
      channel: new Channel type: 'team', links: [], name: 'Editorial'
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
      asset: ->
    html.should.containEql 'is-team-channel'
    html.should.containEql 'team-channel-nav'
    html.should.containEql 'Editorial'

describe 'amp template', ->

  it 'renders headers and footers', ->
    html = render('amp_article')
      article: new Article fixtures.article
      crop: (url) -> url
      resize: (url) -> url
      embed: ->
      asset: ->
      sd: {}
    console.log fixtures.article
    html.should.containEql 'icon-logotype'
    html.should.containEql '<h1 class="large-garamond-header">Top Ten Booths</h1>'
    html.should.containEql 'Just before the lines start forming'
    html.should.containEql '<div class="article-author">Elena Soboleva</div>'

  it 'renders sections', ->
    html = render('amp_article')
      article: new Article fixtures.article
      crop: (url) -> url
      resize: (url) -> url
      embed: ->
      asset: ->
      sd: {}
    html.should.containEql 'Lisson Gallery'
    html.should.containEql 'Courtesy of Guggenheim.'
    html.should.containEql 'https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ2/larger.jpg'
    html.should.containEql '<amp-img src="http://img.jpg" layout="responsive" width="600" height="NaN"></amp-img>'

  it 'includes analytics', ->
    html = render('amp_article')
      article: new Article fixtures.article
      crop: (url) -> url
      resize: (url) -> url
      embed: ->
      asset: ->
      sd: {}
    html.should.containEql '"properties.articleSection": "Other"'
    html.should.containEql '<amp-analytics type="segment">'