_                       = require 'underscore'
sd                      = require('sharify').data
Backbone                = require 'backbone'
FeedItems               = require '../../../components/feed/collections/feed_items.coffee'
imagesLoaded            = require '../../../lib/vendor/imagesloaded.js'
featuredPostsTemplate   = -> require('../templates/featured_posts.jade') arguments...

setupFixedDimensionsThumbnails = require '../../../components/util/fixed_dimensions_thumbnail.coffee'

module.exports = class FeaturedPosts extends Backbone.View

  feedType: 'posts'
  feedUrl: "#{sd.ARTSY_URL}/api/v1/posts/featured/feed"

  initialize: (options) ->
    @pageSize = options.pageSize

    @fetchFeaturedPosts
      success: (posts) => @render(posts)

  fetchFeaturedPosts: (options) ->
    feedItems = new FeedItems()
    feedItems.type = @feedType
    feedItems.urlRoot = @feedUrl
    feedItems.fetchFeedItems
      pageSize: @pageSize * 1.5
      success: (items) =>
        options.success? items.getFeatureablePosts(@model.get('id'))
      error: => @remove()

  render: (posts) ->
    return @remove() if posts.length is 0
    @$el.html featuredPostsTemplate( posts: posts[...@pageSize] )

    setupFixedDimensionsThumbnails @$('.fixed-dimensions img')
    @$el.imagesLoaded?().progress =>
      setupFixedDimensionsThumbnails @$('.fixed-dimensions img')
