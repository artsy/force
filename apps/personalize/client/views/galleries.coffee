SuggestionsView = require './suggestions.coffee'
template = -> require('../../templates/galleries.jade') arguments...

module.exports = class GalleriesView extends SuggestionsView
  template: ->
    template arguments...

  kind: 'gallery'
  followKind: 'profile'
  restrictType: ['PartnerGallery']
  analyticsFollowMessage: 'Followed gallery from personalize gallery search'
  analyticsUnfollowMessage: 'Unfollowed gallery from personalize gallery search'
