SuggestionsView = require './suggestions.coffee'

# template  = -> require('../../templates/galleries.jade') arguments...

module.exports = class InstitutionsView extends SuggestionsView
  template:     -> require('../../templates/institutions.jade') arguments...
  key:          'personalize:suggested-institutions'
  restrictType: 'PartnerMuseum'
