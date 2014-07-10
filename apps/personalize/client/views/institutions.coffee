SuggestionsView = require './suggestions.coffee'
template = -> require('../../templates/institutions.jade') arguments...

module.exports = class InstitutionsView extends SuggestionsView
  template: ->
    template arguments...

  followKind: 'profile'
  kind: 'institution'
  restrictType: ['PartnerMuseum', 'PartnerNonProfit']
  analyticsUnfollowMessage: 'Unfollowed institutions from personalize institutions search'
  analyticsFollowMessage: 'Followed institutions from personalize institutions search'
