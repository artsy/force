_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
moment = require 'moment'
momentTimezone = require 'moment-timezone'
{ POSITRON_URL, APP_URL, ARTSY_EDITORIAL_CHANNEL } = sd = require('sharify').data
request = require 'superagent'
Artwork = require '../models/artwork.coffee'
Artworks = require '../collections/artworks.coffee'
Partner = require '../models/partner.coffee'
Channel = require '../models/channel.coffee'
{ crop, resize } = require '../components/resizer/index.coffee'
Relations = require './mixins/relations/article.coffee'
{ stripTags } = require 'underscore.string'
{ compactObject } = require './mixins/compact_object.coffee'

module.exports = class Article extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{POSITRON_URL}/api/articles"

  defaults:
    sections: [{ type: 'text', body: '' }]

  fetchWithRelated: (options = {}) ->
    # Deferred require
    Articles = require '../collections/articles.coffee'
    superArticles = new Articles
    Promise.allSettled([
      @fetch(
        error: options.error
        headers: 'X-Access-Token': options.accessToken or ''
        cache: true
      )
      superArticles.fetch(
        error: options.error
        cache: true
        headers: 'X-Access-Token': options.accessToken or ''
        data:
          is_super_article: true
      )
    ]).then =>
      slideshowArtworks = new Artworks
      superArticle = null
      superSubArticles = new Articles
      calloutArticles = new Articles
      dfds = []

      # Get slideshow artworks to render server-side carousel
      if @get('sections')?.length and
         (slideshow = _.first(@get 'sections')).type is 'slideshow'
        for item in slideshow.items when item.type is 'artwork'
          dfds.push new Artwork(id: item.id).fetch
            cache: true
            data: access_token: options.accessToken
            success: (artwork) ->
              slideshowArtworks.add(artwork)

      # Check if the article is a super article
      if @get('is_super_article')
        superArticle = this
      else
         # Check if the article is IN a super article
        dfds.push new Articles().fetch
          error: options.error
          cache: true
          headers: 'X-Access-Token': options.accessToken or ''
          data:
            super_article_for: @get('id')
          success: (articles) ->
            superArticle = articles?.models[0]

      # Partner Channel + Team Channels
      if @get('partner_channel_id')
        dfds.push (partner = new Partner(id: @get('partner_channel_id'))).fetch(cache: true)
      else if @get('channel_id')
        dfds.push (channel = new Channel(id: @get('channel_id'))).fetch(cache: true)

      # Callouts
      if @get('sections')?.length
        for item in @get('sections') when item.type is 'callout' and item.article
          dfds.push new Article(id: item.article).fetch
            cache: true
            data: access_token: options.accessToken
            success: (article) ->
              calloutArticles.add(article)

      Promise.allSettled(dfds).then =>
        superArticleDefferreds = if superArticle then superArticle.fetchSuperSubArticles(superSubArticles, options.accessToken) else []
        Promise.allSettled(superArticleDefferreds)
          .then =>

            # Super Sub Article Ids
            superSubArticleIds = []
            if superArticles.length
              for article in superArticles.models
                superSubArticleIds = superSubArticleIds.concat(article.get('super_article')?.related_articles)

            superSubArticles.orderByIds(superArticle.get('super_article').related_articles) if superArticle and superSubArticles?.length
            @set('channel', channel) if channel
            @set('partner', partner) if partner
            options.success?(
              article: this
              slideshowArtworks: slideshowArtworks
              superArticle: superArticle
              superSubArticles: superSubArticles
              superSubArticleIds: superSubArticleIds
              partner: partner if partner
              channel: channel if channel
              calloutArticles: calloutArticles
            )

  isTopTier: ->
    @get('tier') is 1

  href: ->
    "/article/#{@get('slug')}"

  fullHref: ->
    "#{APP_URL}/article/#{@get('slug')}"

  ampHref: ->
    "#{APP_URL}/article/#{@get('slug')}/amp"

  authorHref: ->
    if @get('author') then "/#{@get('author').profile_handle}" else @href()

  cropUrlFor: (attr, args...) ->
    crop @get(attr), args...

  date: (attr) ->
    if @get('channel_id') is ARTSY_EDITORIAL_CHANNEL
      momentTimezone(@get(attr)).tz('America/New_York')
    else
      moment(@get(attr)).local()

  formatDate: ->
    currentYear = moment().year()
    publishedYear = @date('published_at').year()
    year = if currentYear != publishedYear then " #{publishedYear}" else ""

    @date('published_at').format('MMMM Do') + year

  strip: (attr) ->
    stripTags(@get attr)

  byline: ->
    return _s.toSentence(_.pluck(@get('authors'), 'name')) if @hasAuthors()
    return _s.toSentence(_.pluck(@get('contributing_authors'), 'name')) if @hasContributingAuthors()
    return @get('author').name if @get('author')
    ''

  contributingByline: ->
    return _s.toSentence(_.pluck(@get('contributing_authors'), 'name')) if @hasContributingAuthors()
    ''

  hasContributingAuthors: ->
    @get('contributing_authors')?.length > 0

  hasAuthors: ->
    @get('authors')?.length > 0

  getAuthorArray: ->
    creator = []
    creator.push @get('author').name if @get('author')
    creator = _.union(creator, _.pluck(@get('contributing_authors'), 'name')) if @get('contributing_authors')?.length
    creator

  getVideoUrls: ->
    urls = []
    @get('sections').map (section) ->
      if section.type is 'video'
        urls.push section.url
    if @get('hero_section')?.type is 'video'
      urls.push @get('hero_section').url
    urls = _.flatten urls

  getBodyClass: (data) ->
    bodyClass = "body-article body-article-#{@get('layout')}"
    if @get('hero_section') and @get('hero_section').type == 'fullscreen'
      bodyClass += ' body-no-margins body-transparent-header body-transparent-header-white body-fullscreen-article'
      if @get('is_super_article') or data.superArticle
        bodyClass += ' body-no-header'
    if @isEOYSubArticle(data.superSubArticleIds, data.superArticle)
      bodyClass += ' body-eoy-2016'
    if @get('channel')?.isTeam()
      bodyClass += ' body-no-header is-sticky'
    bodyClass

  isEOYSubArticle: (subArticles = [], superArticle) ->
    subArticles.length > 0 and
    not @get('is_super_article') and
    superArticle?.id is sd.EOY_2016_ARTICLE

  hasAMP: ->
    isValidLayout = @get('layout') in ['standard', 'feature', 'news']
    return false if not isValidLayout
    # AMP requires that images provide a width and height
    # Articles that have been converted to ImageCollections will have this info
    for section in @get('sections')
      return false if section.type in ['artworks', 'image']
    return true if @get('layout') is 'news' and @get('published')
    return @get('featured') and @get('published')

  fetchSuperSubArticles: (superSubArticles, accessToken = '') ->
    for id in @get('super_article').related_articles
      new Article(id: id).fetch
        cache: true
        headers: 'X-Access-Token': accessToken
        success: (article) ->
          superSubArticles.add article

  getParselySection: ->
    if @get('channel_id') is ARTSY_EDITORIAL_CHANNEL
      'Editorial'
    else if @get('channel_id')
      @get('channel')?.name || @get('channel')?.get('name')
    else if @get('partner_channel_id')
      'Partner'
    else
      'Other'

  # article metadata tag for parse.ly
  toJSONLD: ->
    tags = @get('tags') || []
    tags = tags.concat @get('layout') if @get('layout')
    tags = tags.concat @get('vertical').name if @get('vertical')
    tags = tags.concat @get('tracking_tags') if @get('tracking_tags')
    compactObject {
      "@context": "http://schema.org"
      "@type": "NewsArticle"
      "headline": @get('thumbnail_title')
      "url": @fullHref()
      "thumbnailUrl": @get('thumbnail_image')
      "datePublished": @get('published_at')
      "dateCreated": @get('published_at')
      "articleSection": @getParselySection()
      "creator": @getAuthorArray()
      "keywords": tags
    }

  toJSONLDAmp: ->
    compactObject {
      "@context": "http://schema.org"
      "@type": "NewsArticle"
      "headline": @get('thumbnail_title')
      "url": @fullHref()
      "thumbnailUrl": @get('thumbnail_image')
      "datePublished": @get('published_at')
      "dateCreated": @get('published_at')
      "dateModified": @get('updated_at')
      "articleSection": @getParselySection()
      "creator": @getAuthorArray()
      "keywords": @get('tags')
      "mainEntityOfPage": @fullHref()
      "author": {
        "name": "Artsy Editorial"
      }
      "publisher": {
        "name": "Artsy"
        "logo": {
          "url": sd.APP_URL + "/images/full_logo.png"
          "height": 103
          "width": 300
        }
      }
      "image": {
        "url": crop(@get('thumbnail_image'), width: 800, height: 600)
        "width": 800
        "height": 600
      }
    }
