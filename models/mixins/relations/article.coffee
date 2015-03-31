Backbone = require 'backbone'

module.exports =
  related: ->
    return @__related__ if @__related__?

    author = new Backbone.Model @get('author')

    @__related__ =
      author: author
