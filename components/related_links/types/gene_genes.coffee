_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Genes = require '../../../collections/genes.coffee'
RelatedLinksView = require '../view.coffee'

module.exports = class RelatedGenesLinksView extends RelatedLinksView
  headerTemplate: _.template '<h2>Related Categories</h2>'
  wrapperTemplate: _.template '<div class="related-genes-links"><%= links %></div>'

  initialize: (options = {}) ->
    @collection = new Genes
    new Backbone.Model().fetch
      url: "#{sd.API_URL}/api/v1/search/filtered/gene/#{options.id}/options"
      success: (model, response, options) =>
        @collection.reset _.map response.related_genes, (k, v) ->
          _.tap {}, (hsh) -> hsh.id = k; hsh.name = v
        @render()
    super
