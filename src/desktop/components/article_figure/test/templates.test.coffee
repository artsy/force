_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
Article = require '../../../models/article'
fixtures = require '../../../test/helpers/fixtures'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'article figure template', ->

  it 'renders article fields', ->
    html = render('template')
      article: new Article thumbnail_title: 'hi', contributing_authors: []
      sd: {}
    html.should.containEql 'hi'

  it 'handles contributing author section from Artsy Editorial', ->
    html = render('template')
      article: new Article
        thumbnail_title: 'hi'
        author_id: '503f86e462d56000020002cc'
        contributing_authors: [ {name: 'Kana', profile_id: 'user345'} ]
      sd: {CURRENT_PATH: '/articles'}
    html.should.not.containEql "\"article-figure-author\""

  it 'handles contributing author not from Artsy Editorial', ->
    html = render('template')
      article: new Article
        thumbnail_title: 'hi'
        author_id: '123'
        contributing_authors: [ {name: 'Kana', profile_id: 'user345'} ]
      sd: {CURRENT_PATH: '/articles'}
    html.should.containEql 'article-figure-author'

  it 'handles one contributing author', ->
    html = render('template')
      article: new Article
        author_id: '123'
        contributing_authors: [ {name: 'Kana', profile_id: 'user345'} ]
      sd: {}
    html.should.not.containEql 'Kana,'
    html.should.containEql 'has-contributing-author'

  it 'handles two contributing authors', ->
    html = render('template')
      article: new Article
        contributing_authors: [
          {name: 'Kana' }
          {name: 'Kina' }
        ]
      sd: {}
    html.should.containEql 'Kana and Kina'
    html.should.containEql 'Kina'
    html.should.containEql 'Kana'
    html.should.containEql 'has-contributing-author'

  it 'handles three or more contributing authors', ->
    html = render('template')
      article: new Article
        contributing_authors: [
          {name: 'Kana' }
          {name: 'Kina' }
          {name: 'Yoshie' }
        ]
      sd: {}
    html.should.containEql '<div class="article-figure-contributing-name">By Kana, Kina and Yoshie</div>'
    html.should.containEql 'has-contributing-author'

  it 'does not render author name if Artsy Editorial, /articles, and has contributing authors', ->
    html = render('template')
      article: new Article
        author_id: '123'
        contributing_authors: [
          {name: 'Kana' }
        ]
      sd: {CURRENT_PATH: '/articles', ARTSY_EDITORIAL_CHANNEL: '123'}
    html.should.not.containEql 'class="article-figure-author"'
