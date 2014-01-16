_             = require 'underscore'
sd            = require('sharify').data
FollowItems   = require './follow_items.coffee'
FollowGene    = require '../models/follow_gene.coffee'

#
# FollowGenes
#
# Collection that maintains the genes followed by the current user
# This collection must implement `getSyncFollowsData` method
module.exports = class FollowGenes extends FollowItems

  url: "#{sd.ARTSY_URL}/api/v1/me/follow/genes"

  model: FollowGene

  # Returns the `data` to be used in the options when
  # fetching following artists with `syncFollows`.
  getSyncFollowsData: (geneIds) ->
    return genes: geneIds
