Backbone            = require 'backbone'
FacebookCustomView  = require '../share/facebook_custom_view.coffee'
PinterestCustomView = require '../share/pinterest_custom_view.coffee'
TwitterCustomView   = require '../share/twitter_custom_view.coffee'

module.exports = 

  initAndRender: (options = {}) ->
    $el = options.el
    fbView = new FacebookCustomView
      el: $el.find('#artist-facebook')
      url: options.url
    fbView.render()

    tweetView = new TwitterCustomView
      el: $el.find('#artist-twitter')
      url: options.url
      text: options.text
    tweetView.render()

    if options.imageUrl
      pinterestView = new PinterestCustomView
        el: $el.find('#artist-pinterest')
        url: options.url
        media: options.imageUrl
        description: options.text
      pinterestView.render()
