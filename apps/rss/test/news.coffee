_ = require 'underscore'
fs = require 'fs'
template = require('jade').compileFile(require.resolve '../templates/news.jade')
sd =
  APP_URL: 'http://localhost'
{ fabricate } = require 'antigravity'
Article = require '../../../models/article'

describe '/rss', ->
  describe 'news', ->
    it 'renders no news', ->
      rendered = template(sd: sd, articles: [])
      rendered.should.containEql '<title>Artsy News</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/news" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Featured Artsy articles.</description>'

    it 'renders articles', ->
      articles = [
        new Article(thumbnail_title: 'Hello', published_at: new Date().toISOString()),
        new Article(thumbnail_title: 'World', published_at: new Date().toISOString())
      ]
      rendered = template(sd: sd, articles: articles)
      rendered.should.containEql '<title>Artsy News</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/news" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Featured Artsy articles.</description>'
      rendered.should.containEql '<item><title>Hello</title>'
      rendered.should.containEql '<item><title>World</title>'
