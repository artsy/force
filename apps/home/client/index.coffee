HeroUnitView = require './hero_unit_view.coffee'
OrderedSets = require '../../../collections/ordered_sets.coffee'
FeaturedLinks = require '../../../collections/featured_links.coffee'
featuredLinksTemplate = -> require('../templates/featured_links.jade') arguments...

module.exports.init = ->
  new HeroUnitView $body: $('body')
  new FeaturedLinks().fetchSetItemsByKey 'homepage:featured-sections', success: (featuredLinks) ->
    $('#home-top-featured-links').html featuredLinksTemplate(featuredLinks: featuredLinks.models)