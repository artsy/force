_ = require 'underscore'
Q = require 'q'
sd = require('sharify').data
Article = require '../../models/article'
Articles = require '../../collections/articles'
Vertical = require '../../models/vertical'
Verticals = require '../../collections/verticals'
embedVideo = require 'embed-video'
{ POST_TO_ARTICLE_SLUGS } = require '../../config'

@articles = (req, res, next) ->
  Q.allSettled([
    (verticals = new Verticals).fetch()
    (articles = new Articles).fetch(
      data:
        published: true
        limit: 50
        sort: '-published_at'
        featured: true
    )
  ]).fail(next).then =>
    res.locals.sd.ARTICLES = articles.toJSON()
    res.locals.sd.ARTICLES_COUNT = articles.count
    vertical = verticals.running()?[0]
    res.render 'articles', vertical: vertical, articles: articles

@show = (req, res, next) ->
  new Article(id: req.params.slug).fetchWithRelated
    accessToken: req.user?.get('accessToken')
    error: res.backboneError
    success: (data) ->
      if req.params.slug isnt data.article.get('slug')
        return res.redirect "/article/#{data.article.get 'slug'}"
      res.locals.sd.SLIDESHOW_ARTWORKS = data.slideshowArtworks?.toJSON()
      res.locals.sd.ARTICLE = data.article.toJSON()
      res.locals.sd.FOOTER_ARTICLES = data.footerArticles.toJSON()
      videoOptions = { query: { title: 0, portrait: 0, badge: 0, byline: 0, showinfo: 0, rel: 0, controls: 2, modestbranding: 1, iv_load_policy: 3, color: "E5E5E5" } }
      res.render 'show', _.extend data, embedVideo: embedVideo, videoOptions: videoOptions

@redirectPost = (req, res, next) ->
  res.redirect 301, req.url.replace 'post', 'article'

@vertical = (req, res, next) ->
  new Vertical(id: req.params.slug).fetch
    error: -> next()
    success: (vertical) ->
      return next() unless req.params.slug is vertical.get('slug')
      new Articles().fetch
        data:
          published: true
          limit: 100
          sort: '-published_at'
          vertical_id: vertical.get('id')
        error: res.backboneError
        success: (articles) ->
          res.locals.sd.ARTICLES = articles.toJSON()
          res.locals.sd.ARTICLES_COUNT = articles.count
          res.locals.sd.VERTICAL = vertical.toJSON()
          res.render 'vertical', vertical: vertical, articles: articles
