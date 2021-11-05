{ bootstrap } = require '../../../components/layout/bootstrap'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
React = require 'react'
ReactDOM = require 'react-dom'
{ NewsPanel } = require '@artsy/reaction/dist/Components/Publishing/News/NewsPanel'
articleTemplate = -> require('../templates/articles_feed.jade') arguments...
request = require 'superagent'
{ resizer } = require '../../../components/resizer/index'
{ toSentence } = require 'underscore.string'

module.exports.MagazineView = class MagazineView extends Backbone.View

  initialize: ({@offset})->
    @$spinner = @$('#articles-page .loading-spinner')
    @$('.is-show-more-button').click => @startInfiniteScroll()

  onInfiniteScroll: =>
    return if @finishedScrolling
    @offset += 10
    query = """
      {
        articles(published: true, limit: 10, sort: "-published_at", featured: true, offset: #{@offset} ) {
          slug
          thumbnail_title
          thumbnail_image
          tier
          published_at
          channel_id
          author{
            name
          }
          contributing_authors{
            name
          }
        }
      }
    """
    request.post(sd.POSITRON_URL + '/api/graphql')
      .send(
        query: query
      ).end (err, response) =>
        articles = response.body.data?.articles
        if articles?.length
          @collection = articles
          @onSync()
        else
          @finishedScrolling = true
          @$('.loading-spinner').hide()
          $('html').removeClass 'infinite-scroll-is-active'
        @$spinner.hide()

  startInfiniteScroll: ->
    @$('.is-show-more-button').hide()
    @$('.loading-spinner').show()
    $('html').addClass 'infinite-scroll-is-active'
    @onInfiniteScroll()
    @throttledInfinite = _.throttle @onInfiniteScroll, 2000, { trailing: false }
    $.onInfiniteScroll => @throttledInfinite()

  onSync: =>
    if @collection.length > 0
      html = articleTemplate
        articles: @collection
        crop: resizer.crop
        toSentence: toSentence
        pluck: _.pluck
      @$('.js-articles-feed').append html
      @$('.js-articles-feed img').error -> $(@).closest('.articles-item').hide()
      @$('#articles-feed-empty-message').hide()
    else
      @$('#articles-feed-empty-message').show()

module.exports.init = ->
  bootstrap()

  new MagazineView
    el: $('#articles-page')
    collection: sd.ARTICLES
    offset: 0

  newsPanel = document.getElementById('news-panel')

  if (newsPanel)
    ReactDOM.render(
      React.createElement(
        NewsPanel,
        {articles: sd.NEWS_ARTICLES}
      ),
      newsPanel
    )
