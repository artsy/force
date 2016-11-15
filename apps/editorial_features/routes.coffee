Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Curation = require '../../models/curation.coffee'
Article = require '../../models/article.coffee'
Articles = require '../../collections/articles.coffee'
Q = require 'bluebird-q'

@eoy = (req, res, next) ->
  @curation = new Curation(id: sd.EOY_2016)
  @article = new Article(id: '582b62870398790011ecd40f')
  Q.all([
  	@curation.fetch()
    @article.fetch()
  ]).then (result) =>
    @superSubArticles = new Articles()

    Q.allSettled(
      @article.fetchSuperSubArticles(@superSubArticles)
    ).then ->
      res.locals.sd.SUPER_ARTICLE = @article.toJSON()
      res.render '../components/eoy/index',
  			curation: @curation
        article: @article
        superSubArticles: @superSubArticles
