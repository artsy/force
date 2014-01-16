SuggestionsView = require './suggestions.coffee'

module.exports = class GalleriesView extends SuggestionsView
  template:     -> require('../../templates/galleries.jade') arguments...
  key:          'personalize:suggested-galleries'
  restrictType: 'PartnerGallery'
