ArticlesGridView = require '../../../components/articles_grid/view.coffee'
ArticleView = require '../../../components/article/client/view.coffee'
Articles = require '../../../collections/articles.coffee'
Article = require '../../../models/article.coffee'
articleTemplate = -> require('../../../components/article/templates/index.jade') arguments...
sd = require('sharify').data
resize = require '../../../components/resizer/index.coffee'
embed = require 'particle'

module.exports = class ArticlesAdapter
  constructor: ({ @profile, @partner, @cache, @el }) ->
    if window.location.pathname.includes '/article/'
      @renderArticle()
    else
      @renderArticlesGrid()

  renderArticlesGrid: ->
    collection = new Articles
    collection.url = "#{collection.url}/?partner_id=#{@partner.get('_id')}&published=true&limit=12&sort=-published_at"
    view = new ArticlesGridView el: @el, collection: collection
    @el.html '<div class="loading-spinner"></div>'
    collection.fetch()
    view

  renderArticle: ->
    slug = _.last window.location.pathname.split('/')
    new Article(id: slug).fetch
      success: (article) =>
        @el.html articleTemplate
          article: article
          hideShare: true
          hideSubscribe: true
          resize: resize
          embed: embed
          moment: moment
        new ArticleView
          el: @el
          article: article
      error: (err) =>
        # window.location.replace '/articles'

