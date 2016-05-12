_ = require 'underscore'
fs = require 'fs'
partnerUpdatesTemplate = require('jade').compileFile(require.resolve '../templates/partner_updates.jade')
articleTemplate = require('jade').compileFile(require.resolve '../templates/partner_updates_article.jade')
sd = APP_URL: 'http://localhost'
{ fabricate } = require 'antigravity'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
moment = require 'moment'

describe '/rss', ->
  describe 'partner_updates', ->
    it 'renders metadata', ->
      rendered = partnerUpdatesTemplate(sd: sd, articles: new Articles)
      rendered.should.containEql '<title>Artsy Partner Updates</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/partner-updates" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Artsy articles featured for Artsy Partner Updates.</description>'

    it 'renders articles', ->
      articles = new Articles [
        new Article(thumbnail_title: 'Hello', published_at: new Date().toISOString(), contributing_authors: []),
        new Article(thumbnail_title: 'World', published_at: new Date().toISOString(), contributing_authors: [])
      ]
      rendered = partnerUpdatesTemplate(sd: sd, articles: articles, moment: moment)
      rendered.should.containEql '<title>Artsy Partner Updates</title>'
      rendered.should.containEql '<atom:link href="http://localhost/rss/partner-updates" rel="self" type="application/rss+xml">'
      rendered.should.containEql '<description>Artsy articles featured for Artsy Partner Updates.</description>'
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
