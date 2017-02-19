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
      article: new Article _.extend fixtures.article, thumbnail_title: 'hi'
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
    html.should.containEql 'article-item-author'

  it 'handles one contributing author', ->
    html = render('template')
      article: new Article
        contributing_authors: [ {name: 'Kana', profile_id: 'user345'} ]
        sd: {}
    html.should.not.containEql 'Kana,'

  it 'handles two contributing authors', ->
    html = render('template')
      article: new Article
        contributing_authors: [
          {name: 'Kana', profile_id: 'user345'}
          {name: 'Kina', profile_id: 'user355'}
        ]
      sd: {}
    html.should.containEql '&nbspand&nbsp'
    html.should.containEql 'class="article-item-contributing-name">Kina'
    html.should.containEql 'class="article-item-contributing-name">Kana'

  it 'handles three or more contributing authors', ->
    html = render('template')
      article: new Article
        contributing_authors: [
          { name: 'Kana', profile_id: 'user345' }
          { name: 'Kina', profile_id: 'user355' }
          { name: 'Yoshie', profile_id: 'user356' }
        ]
      sd: {}
    html.should.containEql 'class="article-item-contributing-name">Kana'
    html.should.containEql 'class="article-item-contributing-name">Kina'
    html.should.containEql 'class="article-item-contributing-name">Yoshie'
