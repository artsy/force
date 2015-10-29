_ = require 'underscore'
fs = require 'fs'
news_template = require('jade').compileFile(require.resolve '../templates/news.jade')
article_template = require('jade').compileFile(require.resolve '../templates/article.jade')
sd =
  APP_URL: 'http://localhost'
{ fabricate } = require 'antigravity'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
moment = require 'moment'

describe '/rss', ->
  describe 'news', ->
    it 'renders no news', ->
      rendered = news_template(sd: sd, articles: new Articles)
      rendered.should.containEql '<title>Artsy News</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/news" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Featured Artsy articles.</description>'

    it 'renders articles', ->
      articles = new Articles [
        new Article(thumbnail_title: 'Hello', published_at: new Date().toISOString()),
        new Article(thumbnail_title: 'World', published_at: new Date().toISOString())
      ]
      rendered = news_template(sd: sd, articles: articles, moment: moment)
      rendered.should.containEql '<title>Artsy News</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/news" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Featured Artsy articles.</description>'
      rendered.should.containEql '<item><title>Hello</title>'
      rendered.should.containEql '<item><title>World</title>'

  describe 'article', ->
    it 'renders contributing authors and their profiles by default', ->
      article = new Article(
        contributing_authors: [{
          name: 'James'
          profile_id: 'foo'
        }],
        author: {
          name: 'Artsy Editorial'
          profile_id: '5086df078523e60002000009'
        }
      )
      rendered = article_template(sd: sd, article: article)
      rendered.should.containEql 'James'
      rendered.should.containEql 'http://localhost/foo'
      rendered.should.not.containEql 'Artsy Editorial'

    it 'renders multiple contributing authors and their profiles', ->
      article = new Article(
        contributing_authors: [
          {
            name: 'James'
            profile_id: 'foo'
          },
          {
            name: 'Plato'
            profile_id: 'bar'
          },
          {
            name: 'Aeschylus'
            profile_id: 'baz'
          }
        ],
        author: {
          name: 'Artsy Editorial'
          profile_id: '5086df078523e60002000009'
        }
      )
      rendered = article_template(sd: sd, article: article)
      rendered.should.containEql 'By&nbsp;<a href="http://localhost/foo">James</a>,&nbsp;'
      rendered.should.containEql '<a href="http://localhost/bar">Plato</a>&nbsp;and&nbsp;'
      rendered.should.containEql '<a href="http://localhost/baz">Aeschylus</a></h2>'
      rendered.should.containEql 'http://localhost/baz'
      rendered.should.not.containEql 'Artsy Editorial'

    it 'renders Artsy Editorial when there are no contributing authors', ->
      article = new Article(
        contributing_authors: [{}],
        author: {
          name: 'Artsy Editorial'
          profile_id: '5086df078523e60002000009'
        }
      )
      rendered = article_template(sd: sd, article: article)
      rendered.should.containEql 'Artsy Editorial'
