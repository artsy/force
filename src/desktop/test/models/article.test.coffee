_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
rewire = require 'rewire'
Article = rewire '../../models/article'
Articles = require '../../collections/articles'
sinon = require 'sinon'
fixtures = require '../helpers/fixtures'
moment = require 'moment'
momentTimezone = require 'moment-timezone'

describe "Article", ->
  beforeEach ->
    Article.__set__ 'sd', {EOY_2016_ARTICLE: '1234'}
    Article.__set__ 'ARTSY_EDITORIAL_CHANNEL', '5759e3efb5989e6f98f77993'
    Article.__set__
    sinon.stub Backbone, 'sync'
      .returns Q.defer()
    @article = new Article

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchWithRelated', ->
    it 'gets all the related data from the article', (done) ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', _.extend {}, fixtures.article, title: 'Moo', sections: []
        .onCall 1
        .yieldsTo 'success', []
        .onCall 2
        .yieldsTo 'success', []
        .onCall 3
        .yieldsTo 'success', [fixtures.channel]
      @article.fetchWithRelated success: (data) ->
        data.article.get('title').should.equal 'Moo'
        done()
      return

    it 'gets the slideshow artworks', (done) ->
      slideshowArticle = _.extend {}, fixtures.article,
        title: 'Moo'
        channel_id: null
        sections: [
          {
            type: 'slideshow'
            items: [
              {
                type: 'artwork', id: 'foo'
              }
            ]
          }
        ]

      Backbone.sync
        .onCall 0
        .yieldsTo 'success', slideshowArticle
        .onCall 1
        .yieldsTo 'success', [fixtures.article]
        .onCall 2
        .yieldsTo 'success', fabricate 'artwork', title: 'foobar'
        .onCall 3
        .yieldsTo 'success', [fixtures.article]

      @article.fetchWithRelated success: (data) ->
        data.slideshowArtworks.first().get('title').should.equal 'foobar'
        done()
      return

    it 'works for those rare sectionless articles', (done) ->
      sectionlessArticle = _.extend {}, fixtures.article,
        title: 'Moo'
        sections: []
        channel_id: null

      Backbone.sync
        .onCall 0
        .yieldsTo 'success', sectionlessArticle
        .onCall 1
        .yieldsTo 'success', [fixtures.article]
        .onCall 2
        .yieldsTo 'success', [fixtures.article]

      @article.fetchWithRelated success: (data) ->
        data.article.get('title').should.equal 'Moo'
        done()
      return

    it 'fetches related articles for super articles', (done) ->
      superArticle = _.extend {}, fixtures.article,
        title: 'SuperArticle',
        is_super_article: true
        sections: []
        channel_id: null
        super_article:
          related_articles: ['id-1']

      relatedArticle = _.extend {}, fixtures.article,
        title: 'RelatedArticle'
        id: 'id-1'

      Backbone.sync
        .onCall 0
        .yieldsTo 'success', superArticle
        .onCall 1
        .yieldsTo 'success', [fixtures.article]
        .onCall 2
        .yieldsTo 'success', relatedArticle

      @article.fetchWithRelated success: (data) ->
        data.superSubArticles.models[0].get('title').should.equal 'RelatedArticle'
        data.article.get('title').should.equal 'SuperArticle'
        done()
      return

    it 'fetches related articles for article in super article', (done) ->
      relatedArticle1 = _.extend {}, fixtures.article,
        id: 'id-1'
        title: 'RelatedArticle 1',
        sections: []
      relatedArticle2 = _.extend {}, fixtures.article,
        id: 'id-2'
        title: 'RelatedArticle 2',
        sections: []
      superArticle = _.extend {}, fixtures.article,
        id: 'id-3'
        title: 'SuperArticle',
        is_super_article: true
        sections: []
        channel_id: null
        super_article:
          related_articles: ['id-1', 'id-2']

      Backbone.sync
        .onCall 0
        .yieldsTo 'success', superArticle
        .onCall 1
        .yieldsTo 'success', [fixtures.article]
        .onCall 2
        .yieldsTo 'success', relatedArticle1
        .onCall 3
        .yieldsTo 'success', relatedArticle2

      @article.fetchWithRelated success: (data) ->
        data.superArticle.get('title').should.equal 'SuperArticle'
        data.superSubArticles.first().get('title').should.equal 'RelatedArticle 1'
        data.superSubArticles.last().get('title').should.equal 'RelatedArticle 2'
        done()
      return

    it 'fetches callout articles', (done) ->
      calloutArticle = _.extend {}, fixtures.article,
        sections: [
          type: 'callout'
          article: '12345'
        ]

      Backbone.sync
        .onCall 0
        .yieldsTo 'success', calloutArticle
        .onCall 4
        .yieldsTo 'success', _.extend {}, fixtures.article,
          thumbnail_title: 'The title of a callout article'

      @article.fetchWithRelated success: (data) ->
        data.calloutArticles.length.should.equal 1
        data.calloutArticles.first().get('thumbnail_title').should.equal 'The title of a callout article'
        done()
      return

  describe '#strip', ->
    it 'returns the attr without tags', ->
      @article.set 'lead_paragraph', '<p><br></p>'
      @article.strip('lead_paragraph').should.equal ''
      @article.set 'lead_paragraph', '<p>Existy</p>'
      @article.strip('lead_paragraph').should.equal 'Existy'

  describe 'byline', ->

    it 'returns the author when there are no contributing authors', ->
      @article.set 'contributing_authors', []
      @article.set 'author', { name: 'Molly' }
      @article.byline().should.equal 'Molly'

    it 'returns the contributing author name if there is one', ->
      @article.set 'contributing_authors', [{name: 'Molly'}]
      @article.byline().should.equal 'Molly'

    it 'returns "and" with two contributing authors', ->
      @article.set 'contributing_authors', [{name: 'Molly'}, {name: 'Kana'}]
      @article.byline().should.equal 'Molly and Kana'

    it 'returns multiple contributing authors', ->
      @article.set 'contributing_authors', [{name: 'Molly'}, {name: 'Kana'}, {name: 'Christina'}]
      @article.byline().should.equal 'Molly, Kana and Christina'

    it 'returns multiple authors', ->
      @article.set 'authors', [{name: 'Molly'}, {name: 'Kana'}, {name: 'Christina'}]
      @article.byline().should.equal 'Molly, Kana and Christina'

  describe 'contributingByline', ->

    it 'returns an empty string when there are no contributing authors', ->
      @article.set 'contributing_authors', []
      @article.contributingByline().should.equal ''

    it 'returns the contributing author name if there is one', ->
      @article.set 'contributing_authors', [{name: 'Molly'}]
      @article.contributingByline().should.equal 'Molly'

    it 'returns "and" with two contributing authors', ->
      @article.set 'contributing_authors', [{name: 'Molly'}, {name: 'Kana'}]
      @article.contributingByline().should.equal 'Molly and Kana'

    it 'returns multiple contributing authors', ->
      @article.set 'contributing_authors', [{name: 'Molly'}, {name: 'Kana'}, {name: 'Christina'}]
      @article.contributingByline().should.equal 'Molly, Kana and Christina'

  describe 'toJSONLD', ->
    it 'includes the layout, vertical and tracking tags', ->
      @article.set
        tags: ['Venice', 'Technology']
        tracking_tags: ['Evergreen', 'Interviews']
        vertical: { name: 'Culture', id: '123' }
        layout: 'standard'
      @article.toJSONLD().keywords.should.eql [ 'Venice', 'Technology', 'standard', 'Culture', 'Evergreen', 'Interviews' ]
    it 'includes datestamps', ->
      @article.set
        published_at: '2019-04-23T16:31:48.205Z'
      @article.toJSONLD().dateCreated.should.eql '2019-04-23T16:31:48.205Z'
      @article.toJSONLD().datePublished.should.eql '2019-04-23T16:31:48.205Z'

  describe 'date', ->
    it 'returns NY time for editorial articles', ->
      @article.set 'channel_id', '5759e3efb5989e6f98f77993'
      @article.set 'date', momentTimezone().tz('America/New_York')
      @article.date('published_at').format('MMM Do, YYYY h:mm a').should.eql  momentTimezone().tz('America/New_York').format('MMM Do, YYYY h:mm a')

    it 'returns local time for non-editorial articles', ->
      @article.set 'date', momentTimezone().tz('America/New_York')
      @article.date('published_at').format('MMM Do, YYYY h:mm a').should.eql  moment().local().format('MMM Do, YYYY h:mm a')

  describe 'getParselySection', ->

    it 'returns Editorial', ->
      @article.set
        channel_id: '5759e3efb5989e6f98f77993'
      @article.getParselySection().should.equal 'Editorial'

    it 'returns channel name', ->
      @article.set
        channel: new Backbone.Model name: 'Life at Artsy'
        channel_id: '123'
      @article.getParselySection().should.equal 'Life at Artsy'

    it 'returns Partner', ->
      @article.set
        partner_channel_id: '123'
        channel_id: null
      @article.getParselySection().should.equal 'Partner'

    it 'returns Other', ->
      @article.set
        partner_channel_id: null
        channel_id: null
      @article.getParselySection().should.equal 'Other'

  describe 'isEOYSubArticle', ->

    it 'returns true for a super-sub-article with matching super article id', ->
      @article.set 'id', '1212'
      @article.isEOYSubArticle(['12','23', '1212'], id: '1234').should.be.true()

    it 'returns false if no sub articles', ->
      @article.set 'id', '1213'
      @article.isEOYSubArticle([], id: '1234').should.be.false()

    it 'returns false if super article does not match', ->
      @article.set 'id', '1213'
      @article.isEOYSubArticle(['12','23', '1213'], id: '1236').should.be.false()

    it 'returns false if article is a super article', ->
      @article.set 'is_super_article', true
      @article.isEOYSubArticle(['12','23', '1213'], id: '1234').should.be.false()

  describe 'AMP methods', ->

    it 'returns true if standard layout', ->
      @article.set
        sections: [ type: 'text' ]
        published: true
        featured: true
        layout: 'standard'
      @article.hasAMP().should.be.true()

    it 'returns true if feature layout', ->
      @article.set
        sections: [ type: 'text' ]
        published: true
        featured: true
        layout: 'feature'
      @article.hasAMP().should.be.true()

    it 'returns true if news layout', ->
      @article.set
        sections: [ type: 'text' ]
        published: true
        featured: true
        layout: 'news'
      @article.hasAMP().should.be.true()

    it 'returns false if article does not have an AMP page artworks', ->
      @article.set sections: [ type: 'artworks' ]
      @article.hasAMP().should.be.false()

    it 'returns false if article does not have an AMP page image', ->
      @article.set sections: [ type: 'image' ]
      @article.hasAMP().should.be.false()

    it 'returns false if article is not standard, feature or news layout', ->
      @article.set
        sections: [ type: 'text' ]
        published: true
        featured: true
        layout: 'series'
      @article.hasAMP().should.be.false()

    it 'returns false if article is not featured', ->
      @article.set
        sections: [ type: 'text' ]
        featured: false
        published: true
      @article.hasAMP().should.be.false()

    it 'returns false if article is a series', ->
      @article.set
        sections: [ type: 'text' ]
        featured: true
        published: true
        layout: 'series'
      @article.hasAMP().should.be.false()
    
    it 'returns false if article is a video', ->
      @article.set
        sections: [ type: 'text' ]
        featured: true
        published: true
        layout: 'video'
      @article.hasAMP().should.be.false()

    it 'preps article for AMP', ->
      @article.set sections: [
        {
          type: 'text',
          body: '<a class="jump-link"></a><p>Preparing the article for AMP.</p>'
        }
        {
          type: 'image_collection'
          images: [
            type: 'image'
            caption: '<p isrender=true style="background-color:black;">A caption is <i isrender=true>really</i> important</p>'
          ]
        }
      ]
      @article.prepForAMP()
      @article.get('sections')[0].body.should.not.containEql '<a class="jump-link></a>"'
      @article.get('sections')[1].images[0].caption.should.equal '<p>A caption is <i>really</i> important</p>'

    it 'returns the full AMP href', ->
      @article.ampHref().should.containEql '/amp'
