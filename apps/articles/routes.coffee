_ = require 'underscore'
sd = require('sharify').data
Article = require '../../models/article'
Articles = require '../../collections/articles'
embedVideo = require 'embed-video'
{ POST_TO_ARTICLE_SLUGS } = require '../../config'

@articles = (req, res, next) ->
  new Articles().fetch
    data:
      published: true
      limit: 50
      sort: '-published_at'
      featured: true
    error: res.backboneError
    success: (articles) ->
      res.locals.sd.ARTICLES = articles.toJSON()
      res.locals.sd.ARTICLES_COUNT = articles.count
      res.render 'articles', articles: articles

@show = (req, res, next) ->
  new Article(id: req.params.slug).fetchWithRelated
    accessToken: req.user?.get('accessToken')
    error: res.backboneError
    success: (article, footerArticles, slideshowArtworks) ->
      if req.params.slug isnt article.get('slug')
        return res.redirect "/article/#{article.get 'slug'}"
      res.locals.sd.SLIDESHOW_ARTWORKS = slideshowArtworks?.toJSON()
      res.locals.sd.ARTICLE = article.toJSON()
      res.locals.sd.FOOTER_ARTICLES = footerArticles.toJSON()
      res.render 'show',
        footerArticles: footerArticles.models
        article: article
        slideshowArtworks: slideshowArtworks
        embedVideo: embedVideo

@redirectPost = (req, res, next) ->
  res.redirect 301, req.url.replace 'post', 'article'
