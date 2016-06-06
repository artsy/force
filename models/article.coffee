_ = require 'underscore'
_s = require 'underscore.string'
Q = require 'bluebird-q'
Backbone = require 'backbone'
moment = require 'moment'
{ POSITRON_URL, APP_URL } = sd = require('sharify').data
request = require 'superagent'
Artwork = require '../models/artwork.coffee'
Section = require '../models/section.coffee'
Artworks = require '../collections/artworks.coffee'
{ crop, resize } = require '../components/resizer/index.coffee'
Relations = require './mixins/relations/article.coffee'
{ stripTags } = require 'underscore.string'
{ compactObject } = require './mixins/compact_object.coffee'
cheerio = require 'cheerio'

module.exports = class Article extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{POSITRON_URL}/api/articles"

  defaults:
    sections: [{ type: 'text', body: '' }]

  fetchWithRelated: (options = {}) ->
    # Deferred require
    Articles = require '../collections/articles.coffee'
    footerArticles = new Articles
    superArticles = new Articles
    Q.allSettled([
      @fetch(
        error: options.error
        headers: 'X-Access-Token': options.accessToken or ''
      )
      footerArticles.fetch(
        error: options.error
        cache: true
        data:
          # Tier 1 Artsy Editorial articles. TODO: Smart footer data.
          author_id: '503f86e462d56000020002cc'
          published: true
          tier: 1
          sort: '-published_at'
      )
      superArticles.fetch(
        error: options.error
        cache: true
        data:
          published: true
          is_super_article: true
      )
    ]).then =>
      slideshowArtworks = new Artworks
      superArticle = null
      relatedArticles = new Articles
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
      # Get related section content if a part of one
      if @get('section_ids')?.length
        dfds.push (section = new Section(id: @get('section_ids')[0])).fetch()
        dfds.push (sectionArticles = new Articles).fetch(
          data: section_id: @get('section_ids')[0], published: true, limit: 50
        )

      # Check if the article is a super article
      if @get('is_super_article')
        superArticle = this
      else
         # Check if the article is IN a super article
        dfds.push new Articles().fetch
          data:
            super_article_for: @get('id')
            published: true
          success: (articles) ->
            superArticle = articles?.models[0]

      Q.allSettled(dfds).then =>
        superArticleDefferreds = if superArticle then superArticle.fetchRelatedArticles(relatedArticles) else []
        Q.allSettled(superArticleDefferreds)
          .then =>

            # Super Sub Article Ids
            superSubArticleIds = []
            if superArticles.length
              for article in superArticles.models
                superSubArticleIds = superSubArticleIds.concat(article.get('super_article')?.related_articles)

            relatedArticles.orderByIds(superArticle.get('super_article').related_articles) if superArticle and relatedArticles?.length
            @set('section', section) if section
            options.success(
              article: this
              footerArticles: footerArticles
              slideshowArtworks: slideshowArtworks
              superArticle: superArticle
              relatedArticles: relatedArticles
              superSubArticleIds: superSubArticleIds
              section: section
              allSectionArticles: sectionArticles if section
            )

  isTopTier: ->
    @get('tier') is 1

  href: ->
    "/article/#{@get('slug')}"

  fullHref: ->
    "#{APP_URL}/article/#{@get('slug')}"

  authorHref: ->
    if @get('author') then "/#{@get('author').profile_handle}" else @href()

  cropUrlFor: (attr, args...) ->
    crop @get(attr), args...

  date: (attr) ->
    moment(@get(attr)).local()

  strip: (attr) ->
    stripTags(@get attr)

  byline: ->
    byline = ''
    if (length = @get('contributing_authors').length) > 0
      _s.toSentence _.pluck @get('contributing_authors'), 'name'
    else
      @get('author').name

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

  getBodyClass: ->
    bodyClass = "body-article body-article-#{@get('layout')}"
    if @get('hero_section') and @get('hero_section').type == 'fullscreen'
      bodyClass += ' body-no-margins body-transparent-header body-transparent-header-white body-fullscreen-article'
      if @get('is_super_article')
        bodyClass += ' body-no-header'

    bodyClass

  topParselyArticles: (article, key, secret, cb) ->
    request
      .get('https://api.parsely.com/v2/analytics/posts')
      .query
        apikey: key
        secret: secret
        limit: 10
        days: 7
        sort: '_hits'
      .end (err, response) =>
        return cb [] if err
        posts = _.where response.body.data, section: 'Editorial'
        posts = _.reject posts, (post) => post.url.indexOf(@href()) > 0
        return cb posts

  prepForInstant: ->

    replaceTagWith = (htmlStr, findTag, replaceTag ) ->
      $ = cheerio.load(htmlStr)
      $(findTag).each ->
        $(this).replaceWith($('<' + replaceTag + '>' + $(this).html() + '</' + replaceTag + '>'))
      $.html()

    sections =  _.map @get('sections'), (section) ->
      if section.type is 'text'
        $ = cheerio.load(section.body)
        $('br').remove()
        $('*:empty').remove()
        $('p').each ->
          $(this).remove() if $(this).text().length is 0
        section.body = $.html()
        section.body = replaceTagWith(section.body, 'h3', 'h2')
        section
      else if section.type is 'image'
        section.caption = replaceTagWith(section.caption, 'p', 'h1') if section.caption
        section
      else if section.type is 'image_set'
        section.images = _.map section.images, (image) ->
          if image.type is 'image'
            image.caption = replaceTagWith(image.caption, 'p', 'h1') if image.caption
          image
        section
      else
        section
    @set 'sections', sections

  #
  # Super Article helpers
  fetchRelatedArticles: (relatedArticles) ->
    for id in @get('super_article').related_articles
      new Article(id: id).fetch
        success: (article) =>
          relatedArticles.add article

  # article metadata tag for parse.ly
  toJSONLD: ->
    compactObject {
      "@context": "http://schema.org"
      "@type": "NewsArticle"
      "headline": @get('thumbnail_title')
      "url": @href()
      "thumbnailUrl": @get('thumbnail_image')
      "dateCreated": @get('published_at')
      "articleSection": if @get('section') then @get('section').get('title') else "Editorial"
      "creator": @getAuthorArray()
      "keywords": @get('tags')
    }
