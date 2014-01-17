sd       = require('sharify').data
Backbone = require 'backbone'
Gene     = require './gene.coffee'

#
# A convenient model that represents a followable gene by the current user.
#
# The model must implement `getFollowParams` and `getItem` methods.
module.exports = class FollowGene extends Backbone.Model

  urlRoot: ->
    "#{sd.ARTSY_URL}/api/v1/me/follow/gene"

  # Store (and cache) the actual Gene instance
  item: null

  # Returns the api params to be used for following the gene
  getFollowParams: (geneId) ->
    return gene_id: geneId

  #
  # Returns the underlying instance of Gene model
  #
  # Since this is a convenient model for following, sometimes we might 
  # need the actual model, for example, in order to use its methods.
  # Instead of extending the actual model and inheriting lots of unnecessary
  # stuff in the prototype (or mistakenly calling methods of the actual model
  # with wrong model url), we lazily create/cache an instance of the model.
  getItem: ->
    @item = new Gene @get 'gene' unless @item?
    @item
