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
        limit: 20
        sort: '-published_at',
        featured: true
    )
  ]).fail(next).then =>
    res.locals.sd.ARTICLES = articles.toJSON()
    res.locals.sd.ARTICLES_COUNT = articles.count
    # TODO: For QA purpose we show admins the first vertical regardless.
    # After VB QA we'll only use the else code.
    if req.user?.isEditorialAdmin()
      vertical = verticals.first()
    else
      vertical = verticals.running()[0]
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
      res.render 'show', _.extend data, embedVideo: embedVideo

@redirectPost = (req, res, next) ->
  res.redirect 301, req.url.replace 'post', 'article'

@vertical = (req, res, next) ->
  new Vertical(id: req.params.slug).fetch
    error: res.backboneError
    success: (vertical) ->
      return next() unless req.params.slug is vertical.get('slug')
      new Articles().fetch
        data: vertical_id: vertical.get('id'), published: true
        error: res.backboneError
        success: (articles) ->
          res.render 'vertical',
            vertical: vertical
            articles: articles
            featuredVerticalArticles: articles.featuredToVertical(vertical)
