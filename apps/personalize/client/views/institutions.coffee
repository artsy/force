SuggestionsView = require './suggestions.coffee'

module.exports = class InstitutionsView extends SuggestionsView
  template: -> require('../../templates/institutions.jade') arguments...

  kind:                     'institution'
  key:                      'personalize:suggested-institutions'
  restrictType:             'PartnerMuseum'
  analyticsUnfollowMessage: 'Unfollowed institutions from personalize institutions search'
  analyticsFollowMessage:   'Followed institutions from personalize institutions search'
