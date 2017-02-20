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
{ toSentence } = require 'underscore.string'
{ resize } = require '../../../components/resizer'

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

    it 'renders image, artworks, and image_collection sections', ->
      article = new Article(
        lead_paragraph: 'Andy Foobar never wanted fame.'
        sections: [
          {
            type: 'image'
            url: 'http://artsy.net/image1.jpg'
            caption: '<p>The first caption</p>'
          },
          {
            type: 'artworks',
            layout: 'overflow_fillwidth',
            artworks: [{
              type: 'artwork'
              id: '5321b73dc9dc2458c4000196'
              slug: "govinda-sah-azad-in-between-1",
              date: "2015",
              title: "In Between as an Artwork",
              image: "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg",
              partner: {
                name: "Gagosian Gallery",
                slug: "gagosian-gallery"
              },
              artists: [{
                name: "Andy Warhol",
                slug: "andy-warhol"
              }]
            }]
          },
          {
            type: 'image_collection',
            layout: 'overflow_fillwidth',
            images: [
              {
                type: 'artwork'
                id: '5321b73dc9dc2458c4000196'
                slug: "govinda-sah-azad-in-between-1",
                date: "2015",
                title: "In Between as Image Collection",
                image: "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg",
                partner: {
                  name: "October Gallery",
                  slug: "october-gallery"
                },
                artists: [{
                  name: "Govinda Sah 'Azad'",
                  slug: "govinda-sah-azad"
                },
                {
                  name: "Andy Warhol",
                  slug: "andy-warhol"
                },
                {
                  name: "Joe Fun",
                  slug: "joe-fun"
                }]
              },{
                type: 'image'
                url: "http://artsy.net/image2.jpg",
                caption: "<p>The second caption</p>",
              }
            ]
          }
        ]
        contributing_authors: []
      )
      rendered = iaTemplate(sd: sd, article: article, resize: resize, _: _, toSentence: toSentence)
      rendered.should.containEql "<p>The first caption</p>"
      rendered.should.containEql "In Between as an Artwork, 2015."
      rendered.should.containEql "Andy Warhol"
      rendered.should.containEql "In Between as Image Collection, 2015."
      rendered.should.containEql "Govinda Sah 'Azad', Andy Warhol and Joe Fun<br/>October Gallery"
      rendered.should.containEql "<p>The second caption</p>"
