_ = require 'underscore'
fs = require 'fs'
iasTemplate = require('jade').compileFile(require.resolve '../templates/instant_articles.jade')
iaTemplate = require('jade').compileFile(require.resolve '../templates/instant_article.jade')
sd =
  APP_URL: 'http://localhost'
{ fabricate } = require 'antigravity'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
moment = require 'moment'

describe '/instant_articles', ->
  describe 'instant articles', ->
    it 'renders no instant articles', ->
      rendered = iasTemplate(sd: sd, articles: new Articles)
      rendered.should.containEql '<title>Artsy</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/instant-articles" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Featured Artsy articles</description>'

    it 'renders articles', ->
      articles = new Articles [
        new Article(title: 'Hello', published_at: new Date().toISOString(), author: name: 'Kana'),
        new Article(title: 'World', published_at: new Date().toISOString(), author: name: 'Kana')
      ]
      rendered = iasTemplate(sd: sd, articles: articles, moment: moment)
      rendered.should.containEql '<title>Artsy</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/instant-articles" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Featured Artsy articles</description>'
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
      rendered = iaTemplate(sd: sd, article: article)
      rendered.should.containEql '<address>James</address>'
      rendered.should.containEql '<address>Artsy Editorial</address>'

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
      rendered = iaTemplate(sd: sd, article: article)
      rendered.should.containEql '<address>James</address>'
      rendered.should.containEql '<address>Artsy Editorial</address>'
      rendered.should.containEql '<address>Plato</address>'
      rendered.should.containEql '<address>Aeschylus</address>'

    it 'renders the lead paragraph', ->
      article = new Article(
        lead_paragraph: 'Andy Foobar never wanted fame.'
      )
      rendered = iaTemplate(sd: sd, article: article)
      rendered.should.containEql '<h3>Andy Foobar never wanted fame.</h3>'

    it 'renders sections', ->
      article = new Article fabricate 'article'
      rendered = iaTemplate(sd: sd, article: article)
      rendered.should.containEql '<img src="https://artsy-media-uploads.s3.amazonaws.com/9-vuUwfMbo9-dibbqjZQHQ%2FSterling_Ruby_2013_%282%29.jpg"/>'
      rendered.should.containEql '<figcaption><p>Sterling Ruby, Los Angeles, 2013. Photo by CG Watkins. Courtesy Sterling Ruby Studio and Gagosian Gallery</p></figcaption>'
      rendered.should.containEql '<p>Installation view of&nbsp;“The Los Angeles Project” at Ullens Center for Contemporary Art, Beijing. Courtesy UCCA</p>'
      rendered.should.containEql '<a href="https://artsy.net/ucca">'

    it 'renders a signup embed for every article', ->
      article = new Article fabricate 'article'
      rendered = iaTemplate(sd: sd, article: article)
      rendered.should.containEql 'link.artsy.net/join/sign-up-editorial-facebook'

    it 'renders the description', ->
      articles = new Articles [
        new Article _.extend fabricate 'article', description: 'A piece about the Whitney.'
      ]
      rendered = iasTemplate(sd: sd, articles: articles)
      rendered.should.containEql '<description>A piece about the Whitney.</description>'
