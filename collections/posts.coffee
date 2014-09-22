_ = require 'underscore'
Backbone = require 'backbone'
Post = require('../models/post.coffee')

module.exports = class Posts extends Backbone.Collection
  model: Post

  parse: (response) ->
    _.filter response, (obj) ->
      post = new Post obj
      # Specs for these collection filters?
      post.defaultImage()?.imageUrlForMaxSize?()?
