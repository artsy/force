sd = require('sharify').data
Articles = require '../../collections/articles.coffee'
Article = require '../../models/article.coffee'
embedVideo = require 'embed-video'

@index = (req, res, next) ->
  new Articles().fetch
    data: published: true
    error: res.backboneError
    success: (articles) -> res.render 'index', articles: articles.models

@show = (req, res, next) ->
  new Article(id: req.params.id).fetch
    error: res.backboneError
    success: (article) ->
      article.fetchAuthor
        error: res.backboneError
        success: (author) ->
          res.locals.sd.ARTICLE = article.toJSON()
          res.locals.sd.AUTHOR = author.toJSON()
          res.render 'show',
            article: article
            author: author
            embedVideo: embedVideo