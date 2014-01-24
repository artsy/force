HeroUnitView = require './hero_unit_view.coffee'
OrderedSets = require '../../../collections/ordered_sets.coffee'

featuredSections = new OrderedSets(key: 'homepage:featured-sections')

module.exports.init = ->
  new HeroUnitView $body: $('body')
  featuredSections.fetchAll success: -> console.log arguments