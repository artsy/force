_ = require 'underscore'
sd = require('sharify').data
Genes = require '../../../collections/genes.coffee'
RelatedLinksView = require '../view.coffee'

module.exports = class RelatedGenesLinksView extends RelatedLinksView
  headerTemplate: _.template '<h2>Related Categories</h2>'
  wrapperTemplate: _.template '<div class="related-genes-links"><%= links %></div>'
  limit: 10

  initialize: (options) ->
    @headerTemplate = if options.headerTemplate then options.headerTemplate else @headerTemplate
    @limit = if options.limit then options.headerTemplate else @headerTemplate

    @collection = new Genes
    @collection.url = "#{sd.API_URL}/api/v1/related/genes?artist[]=#{options.id}"
    @collection.fetch data: size: @limit

    super
