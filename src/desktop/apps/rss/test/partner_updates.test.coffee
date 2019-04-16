_ = require 'underscore'
fs = require 'fs'
partnerUpdatesTemplate = require('jade').compileFile(require.resolve '../templates/partner_updates.jade')
articleTemplate = require('jade').compileFile(require.resolve '../templates/partner_updates_article.jade')
sd = APP_URL: 'http://localhost'
{ fabricate } = require 'antigravity'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
moment = require 'moment'
{ toSentence } = require 'underscore.string'
{ resize } = require '../../../components/resizer'

describe '/rss', ->
  describe 'partner_updates', ->
    it 'renders metadata', ->
      rendered = partnerUpdatesTemplate(sd: sd, articles: new Articles)
      rendered.should.containEql '<title>Gallery Partner Updates</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/partner-updates" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Artsy articles featured for Gallery Partner Updates.</description>'

    it 'renders articles', ->
      articles = new Articles [
        new Article(thumbnail_title: 'Hello', published_at: new Date().toISOString(), contributing_authors: []),
        new Article(thumbnail_title: 'World', published_at: new Date().toISOString(), contributing_authors: [])
      ]
      rendered = partnerUpdatesTemplate(sd: sd, articles: articles, moment: moment)
      rendered.should.containEql '<title>Gallery Partner Updates</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/partner-updates" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Artsy articles featured for Gallery Partner Updates.</description>'
      rendered.should.containEql '<item><title>Hello</title>'
      rendered.should.containEql '<item><title>World</title>'

    it 'renders contributing authors', ->
      articles = new Articles [
        new Article
          thumbnail_title: 'Hello',
          published_at: new Date().toISOString(),
          contributing_authors: [{name: 'James'}, {name: 'Artsy Editorial'}]
        new Article
          thumbnail_title: 'World',
          published_at: new Date().toISOString(),
          contributing_authors: [{name: 'James'}, {name: 'Artsy Editorial'}, {name: 'Alice'}]
      ]
      rendered = partnerUpdatesTemplate(sd: sd, articles: articles, moment: moment)
      rendered.should.containEql 'James&nbsp;and&nbsp;Artsy Editorial'
      rendered.should.containEql 'James,&nbsp;Artsy Editorial&nbsp;and&nbsp;Alice'

    it 'renders artsy partner updates when there is no contributing author', ->
      articles = new Articles [
        new Article
          thumbnail_title: 'Hello',
          published_at: new Date().toISOString(),
          contributing_authors: [],
          author: {name: 'Artsy Partner Updates'}
      ]
      rendered = partnerUpdatesTemplate(sd: sd, articles: articles, moment: moment)
      rendered.should.containEql '<author>Artsy Partner Updates</author>'

  describe 'article', ->

    it 'renders the lead paragraph and body text', ->
      article = new Article(
        lead_paragraph: 'Andy Foobar never wanted fame.'
        sections: [
          {
            type: 'text'
            body: 'But sometimes fame chooses you.'
          }
        ]
        contributing_authors: []
      )
      rendered = articleTemplate(sd: sd, article: article)
      rendered.should.containEql '<p>Andy Foobar never wanted fame.</p><p>But sometimes fame chooses you.</p>'

    it 'renders images, artworks, and image_collection', ->
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
      rendered = articleTemplate(sd: sd, article: article, resize: resize, _: _, toSentence: toSentence)
      rendered.should.containEql "In Between as Image Collection, 2015. <br/>Govinda Sah 'Azad', Andy Warhol and Joe Fun<br/>October Gallery"
      rendered.should.containEql "<p>The first caption</p>"
      rendered.should.containEql "<p>The second caption</p>"
      rendered.should.containEql "In Between as an Artwork, 2015. <br/>Andy Warhol<br/>Gagosian Gallery"
