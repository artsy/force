Backbone = require 'backbone'

module.exports =
  initializeGeneArtists: ->
    @initializeGenes size: 5, success: => @setupArtists()

  setupArtists: ->
    $.when.apply(null, @genes.map (gene) =>
      gene.trendingArtists.fetch
        data: size: 5, price_range: @user.get('price_range')
    ).then =>
      @renderGeneSuggestions()

  renderGeneSuggestions: ->
    @suggestions.add(@genes.map (gene) => @createGeneSuggestionSet gene)

  createGeneSuggestionSet: (gene) ->
    new Backbone.Model
      id: gene.id
      name: "Suggested for you in #{gene.get 'name'}"
      analyticsLabel: 'artist gene suggestions'
      suggestions: gene.trendingArtists
