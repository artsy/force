Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
ArticleView = require '../../../components/article/client/view.coffee'
GalleryInsightsView = require './gallery_insights.coffee'
EditorialSignupView = require './editorial_signup.coffee'
{ resize, crop } = require '../../../components/resizer/index.coffee'
embed = require 'particle'
JumpView = require '../../../components/jump/view.coffee'
moment = require 'moment'
articleTemplate = -> require('../../../components/article/templates/index.jade') arguments...

module.exports = class ArticleIndexView extends Backbone.View

  initialize: (options) ->
    @params = new Backbone.Model
      author_id: sd.ARTSY_EDITORIAL_ID
      published: true
      tier: 1
      sort: '-published_at'
      is_super_article: false
      limit: 5

    # Main Article
    @article = new Article sd.ARTICLE
    new ArticleView
      el: $('body')
      article: @article
      waypointUrls: true
      lushSignup: true

    @setupInfiniteScroll() if sd.SCROLL_ARTICLE is 'infinite'

  setupInfiniteScroll: ->
    @displayedArticles = [@article.get('slug')]
    @collection = new Articles
      cache: true
      data: @params.toJSON()
    @jump = new JumpView threshold: $(window).height(), direction: 'bottom'
    $('#articles-show').append @jump.$el
    @listenTo @collection, 'sync', @render

    @listenTo @params, 'change:offset', =>
      $('#articles-show').addClass 'is-loading'
      @collection.fetch
        cache: true
        remove: false
        data: @params.toJSON()
        complete: => $('#articles-show').removeClass 'is-loading'

    $.onInfiniteScroll(@nextPage, {offset: 5000})
    $(window).scroll(_.debounce( (-> $.waypoints('refresh')), 100))

  render: (collection, response) =>
    if response
      articles = _.reject response.results, (a) =>
        (a.id is @article.id) or (a.hero_section?.type is 'fullscreen') or (_.contains(sd.SUPER_SUB_ARTICLE_IDS, a.id))
      @displayedArticles = @displayedArticles.concat _.pluck(articles, 'slug')

      for article in articles
        # Setup and append article template
        article = new Article article
        $("#articles-body-container").append articleTemplate
          article: article
          sd: sd
          resize: resize
          moment: moment
          embed: embed
          crop: crop
          lushSignup: false

        previousHref = @displayedArticles[@displayedArticles.indexOf(article.get('slug'))-1]
        # Initialize client
        feedArticle = new ArticleView
          el: $(".article-container[data-id=#{article.get('id')}]")
          article: article
          gradient: true
          waypointUrls: true
          seenArticleIds: (_.pluck articles, 'id').slice(0,3)
          previousHref: previousHref

  nextPage: =>
    @params.set offset: (@params.get('offset') + 5) or 0

module.exports.init = ->
  new ArticleIndexView el: $('body')
  new GalleryInsightsView el: $('body')
  new EditorialSignupView el: $('body')
