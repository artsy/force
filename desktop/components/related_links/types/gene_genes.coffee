_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Genes = require '../../../collections/genes'
RelatedLinksView = require '../view'

module.exports = class RelatedGenesLinksView extends RelatedLinksView
  headerTemplate: _.template '<h2>Related Categories</h2>'
  wrapperTemplate: _.template '<div class="related-genes-links"><%= links %></div>'

  initialize: (options = {}) ->
    @collection = new Genes
    @collection.fetch
      url: "#{sd.API_URL}/api/v1/gene/#{options.id}/similar"
      success: (collection) => @render()
    super
