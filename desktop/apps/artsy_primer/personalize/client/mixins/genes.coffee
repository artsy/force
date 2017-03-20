_ = require 'underscore'
Backbone = require 'backbone'
Genes = require '../../../../../collections/genes.coffee'
{ Following } = require '../../../../../components/follow_button/index.coffee'

module.exports =
  initializeGenes: (options = { size: 5 }) ->
    @geneFollowing = new Following null, kind: 'gene'
    @geneFollowing.fetch
      data: size: options.size
      success: _.wrap options.success, (success, collection, response, options) =>
        @setupGenes collection
        success? collection, response, options

  setupGenes: (collection) ->
    @genes = new Genes(collection.pluck 'gene')
