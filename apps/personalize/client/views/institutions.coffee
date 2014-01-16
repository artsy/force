SuggestionsView = require './suggestions.coffee'

module.exports = class InstitutionsView extends SuggestionsView
  template:     -> require('../../templates/institutions.jade') arguments...
  key:          'personalize:suggested-institutions'
  restrictType: 'PartnerMuseum'
