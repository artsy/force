Backbone = require 'backbone'
{ defer } = require 'underscore'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
FillwidthView = require '../../../../components/fillwidth_row/view.coffee'
Categories = require '../../../../collections/genes.coffee'
QuasiInfiniteView = require '../quasi_infinite/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class CategoriesView extends QuasiInfiniteView
  className: 'settings-categories'

  kind: 'categories'

  initialize: ({ @user }) ->
    @params = new Backbone.Model
      total_count: true
      size: 5
      page: 1

    @categories = new Categories
    @collection = new Following [], kind: 'gene'
    @allFollows = new Following [], kind: 'gene'

    @listenTo @collection, 'sync', @syncFollows

    super

  syncFollows: (follows) ->
    @allFollows.add follows.models

  renderCount: 0

  postRender: ->
    return unless @collection.length

    begin = @categories.length
    @categories.add @collection.pluck 'gene'
    end = @categories.length

    categories = new Categories @categories.slice begin, end

    @$(@selectors.collection)[if @renderCount is 0 then 'html' else 'append'] template
      categories: categories

    Promise.all categories.map (category) ->
      category.related().artworks.fetch()
    .then =>
      categories.each (category) =>
        $el = @$(".js-settings-categories__following__category__artworks[data-id='#{category.id}']")
          .attr 'data-state', 'loaded'

        view = new FillwidthView
          el: $el
          collection: category.related().artworks
          doneFetching: true
          artworkCollection: @user.defaultArtworkCollection()

        view.render()
        view.hideSecondRow()
        view.removeHiddenItems()

        @subViews.push view

    .then =>
      categories.each (category) =>
        view = new FollowButton
          el: @$(".js-entity-follow[data-id='#{category.id}']")
          following: @allFollows
          modelName: 'gene'
          model: category
          context_page: "User setttings page"

        @subViews.push view

    @renderCount += 1
