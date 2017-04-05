_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Follows = require './follows'
FollowGene = require '../models/follow_gene'

#
# FollowGenes
# Maintains the entities followed by the current user and offers `syncFollows` to retrieve
#
module.exports = class FollowGenes extends Follows

  url: "#{sd.API_URL}/api/v1/me/follow/genes"

  model: FollowGene

  type: 'gene'

  formatIds: (entityIds) ->
    genes: _.first entityIds, @maxSyncSize

  followEntity: (geneId, options) ->
    follow = new FollowGene
    follow.set { gene: { id: geneId } }
    follow.save { gene_id: geneId }, options
    follow
