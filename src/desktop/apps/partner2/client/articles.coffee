_ = require 'underscore'
ArticlesGridView = require '../../../components/articles_grid/view.coffee'
ArticleView = require '../../../components/article/client/view.coffee'
{ Articles } = require '../../../collections/articles'
Article = require '../../../models/article.coffee'
articleTemplate = -> require('../../../components/article/templates/index.jade') arguments...
{ resize } = require '../../../components/resizer/index.coffee'
embed = require 'particle'
moment = require 'moment'
jsonldTemplate = -> require('../../../components/main_layout/templates/json_ld.jade') arguments...
{ stringifyJSONForWeb } = require '../../../components/util/json.coffee'

module.exports = class ArticlesAdapter
  constructor: ({ @profile, @partner, @cache, @el }) ->
    @renderArticle() if @isArticle()
    @renderArticlesGrid() if not @isArticle()

  isArticle: ->
    window.location.pathname.includes '/article/'

  renderArticlesGrid: ->
    @collection = new Articles
    @collection.url = "#{@collection.url}/?partner_id=#{@partner.get('_id')}&published=true&limit=12&sort=-published_at&count=true"
    view = new ArticlesGridView
      el: @el
      collection: @collection
      partner: @partner
    @el.html '<div class="loading-spinner"></div>'
    @collection.fetch()
    view

  renderArticle: ->
    slug = _.last window.location.pathname.split('/')
    new Article(id: slug).fetch
      success: (article) =>
        @el.html articleTemplate
          article: article
          resize: resize
          embed: embed
          moment: moment
        @el.append("<div class='article-footer'></div>")
        @el.append jsonldTemplate
          jsonLD: stringifyJSONForWeb article.toJSONLD()
        new ArticleView
          el: @el
          article: article
        @collection = new Articles
        @collection.url = "#{@collection.url}/?channel_id=#{@partner.get('_id')}&published=true&limit=6&sort=-published_at"
        new ArticlesGridView
          el: @el.children('.article-footer')
          collection: @collection
          partner: @partner
          header: "More From #{@partner.displayName()}"
          hideMore: true
          article: article
        @collection.fetch()
      error: (err) =>
        window.location.replace @partner.href()
