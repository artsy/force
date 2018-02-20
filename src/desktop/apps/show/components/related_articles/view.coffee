_ = require 'underscore'
template = -> require('./template.jade') arguments...
metaphysics = require '../../../../../lib/metaphysics.coffee'
Backbone = require 'backbone'
module.exports = class RelatedArticlesView extends Backbone.View

  defaults:
    numToShow: 4

  initialize: (options = {}) ->
    { @numToShow, @showId } = _.defaults options, @defaults
    @fetch()

  fetch: ->
    metaphysics
      variables: show_id: @showId
      query: '
        query($show_id: String!)
        {
          related_articles: articles(show_id: $show_id) {
            id
            href
            title
            thumbnail_title
            author {
              name
              href
            }
            thumbnail_image {
              cropped(width: 300, height: 225) {
                url
              }
            }
          }
        }
      '
    .then (data) =>
      @relatedArticles = data.related_articles
      @render()

  render: ->
    if @relatedArticles.length
      @$el.html template
        articles: _.take(@relatedArticles, @numToShow)
        remaining: Math.max((@relatedArticles.length - @numToShow), 0)
    this

  events:
    'click .related-articles-show-all': 'showAll'

  showAll: (e) ->
    e.preventDefault()
    @numToShow = @relatedArticles.length
    @render()
