_ = require 'underscore'
sd = require('sharify').data
Genes = require '../../../collections/genes.coffee'
RelatedLinksView = require '../view.coffee'

module.exports = class RelatedGenesLinksView extends RelatedLinksView
  headerTemplate: _.template '<h2>Related Categories</h2>'
  wrapperTemplate: _.template '<div class="related-genes-links"><%= links %></div>'

  initialize: (options = {}) ->
    @collection = new Genes
    @collection.url = "#{sd.API_URL}/api/v1/related/genes?artist[]=#{options.id}"
    @collection.fetch data: size: 10
    super
