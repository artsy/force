SuggestionsView = require './suggestions.coffee'

module.exports = class InstitutionsView extends SuggestionsView
  template: -> require('../../templates/institutions.jade') arguments...

  followKind:               'profile'
  kind:                     'institution'
  restrictType:             'PartnerMuseum'
  analyticsUnfollowMessage: 'Unfollowed institutions from personalize institutions search'
  analyticsFollowMessage:   'Followed institutions from personalize institutions search'
