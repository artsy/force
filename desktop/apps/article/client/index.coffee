Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
ArticleView = require '../../../components/article/client/view.coffee'
GalleryInsightsView = require '../../../components/email/client/gallery_insights.coffee'
EditorialSignupView = require '../../../components/email/client/editorial_signup.coffee'
ArticlesGridView = require '../../../components/articles_grid/view.coffee'
TeamChannelNavView = require '../../../components/channel_nav/view.coffee'
VeniceBanner = require '../../../components/venice_banner/index.coffee'
Channel = require '../../../models/channel.coffee'
Sale = require '../../../models/sale.coffee'
Partner = require '../../../models/partner.coffee'
Profile = require '../../../models/profile.coffee'
{ resize, crop } = require '../../../components/resizer/index.coffee'
embed = require 'particle'
JumpView = require '../../../components/jump/view.coffee'
moment = require 'moment'
articleTemplate = -> require('../../../components/article/templates/index.jade') arguments...
promotedTemplate = -> require('../templates/promoted_content.jade') arguments...
saleQuery = require '../queries/sale.coffee'
partnerQuery = require '../queries/partner.coffee'
metaphysics = require '../../../../lib/metaphysics.coffee'

module.exports = class ArticleIndexView extends Backbone.View

  initialize: (options) ->
    @params = new Backbone.Model
      channel_id: sd.ARTSY_EDITORIAL_CHANNEL
      published: true
      tier: 1
      sort: '-published_at'
      is_super_article: false
      limit: 5

    # Main Article
    @channel = new Channel sd.ARTICLE_CHANNEL
    @article = new Article sd.ARTICLE
    new ArticleView
      el: $('body')
      article: @article
      waypointUrls: true
      lushSignup: true

    if sd.SCROLL_ARTICLE is 'infinite'
      @setupInfiniteScroll()
    else unless sd.SUPER_SUB_ARTICLES.length
      @setupFooterArticles()
    if @article.get('channel_id') is sd.PC_ARTSY_CHANNEL or
      @article.get('channel_id') is sd.PC_AUCTION_CHANNEL
        @setupPromotedContent()
    if @article.get('section_ids')?.includes sd.VENICE_2015_SECTION
      @setupVeniceBanner()
    @setupTeamChannel() if @channel.isTeam()

  setupTeamChannel: ->
    @nav = new TeamChannelNavView
      el: $('body')
      $content: $('.article-content')
      offset: 0

  setupVeniceBanner: ->
    new VeniceBanner el: @$('.venice-redirect-banner--article')

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

  setupPromotedContent: =>
    if @article.get('channel_id') is sd.PC_ARTSY_CHANNEL
      send = method: 'post', query: partnerQuery(@article.get('partner_ids')?[0])
      metaphysics send
      .then (data) =>
        $('#articles-show').prepend promotedTemplate
          src: data.partner.profile.image.cropped?.url
          name: data.partner.name
          href: data.partner.profile.href
          type: if data.partner.type is 'Gallery' then 'Gallery' else 'Institution'
    else if @article.get('channel_id') is sd.PC_AUCTION_CHANNEL
      send = method: 'post', query: saleQuery(@article.get('auction_ids')?[0])
      metaphysics send
      .then (data) =>
        $('#articles-show').prepend promotedTemplate
          src: data.sale.cover_image.cropped?.url
          name: data.sale.name
          href: data.sale.href
          type: 'Auction'

  setupFooterArticles: ->
    data =
      published: true
      sort: '-published_at'
      limit: 12
    if @article.get('channel_id')
      data.channel_id = @article.get('channel_id')
    else
      data.featured = true
      data.channel_id = sd.ARTSY_EDITORIAL_CHANNEL
    @collection = new Articles
    new ArticlesGridView
      el: $('#articles-footer').addClass('articles-grid')
      hideMore: true
      header: "More from #{@channel.get('name') or 'Artsy'}"
      collection: @collection
    @collection.fetch
      data: data

module.exports.init = ->
  new ArticleIndexView el: $('body')
  new GalleryInsightsView el: $('body').addClass('body-responsive')
  new EditorialSignupView el: $('body')
