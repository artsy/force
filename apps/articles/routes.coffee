_ = require 'underscore'
sd = require('sharify').data
Article = require '../../models/article'
Articles = require '../../collections/articles'
embedVideo = require 'embed-video'

@index = (req, res, next) ->
  new Articles().fetch
    data: published: true
    error: res.backboneError
    success: (articles) -> res.render 'index', articles: articles.models

@show = (req, res, next) ->
  footerArticles = new Articles()
  article = new Article(id: req.params.slug)
  author = null
  done = _.after 2, ->
    res.locals.sd.ARTICLE = article.toJSON()
    res.locals.sd.AUTHOR = author.toJSON()
    res.locals.sd.FOOTER_ARTICLES = footerArticles.toJSON()
    res.render 'show',
      footerArticles: footerArticles.models
      article: article
      author: author
      embedVideo: embedVideo
  footerArticles.fetch
    cache: true
    data:
      author_id: '503f86e462d56000020002cc' # Artsy Editorial. TODO: Smart footer data.
      published: true
    success: done
  article.fetch
    cache: true
    headers: 'X-Access-Token': req.user?.get('accessToken')
    error: res.backboneError
    success: ->
      article.fetchAuthor
        cache: true
        error: res.backboneError
        success: (a) -> author = a; done()
