sd       = require('sharify').data
Backbone = require 'backbone'

#
# A convenient model that represents a followable gene by the current user.
#
# The model must implement `getFollowParams` and `getItem` methods.
module.exports = class FollowGene extends Backbone.Model

  urlRoot: ->
    "#{sd.ARTSY_URL}/api/v1/me/follow/gene"

  # Returns the api params to be used for following the gene
  getFollowParams: (geneId) ->
    return gene_id: geneId

  # Returns the underlying gene attributes
  getItem: ->
    return @get('gene')
