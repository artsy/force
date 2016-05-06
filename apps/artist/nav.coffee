_ = require 'underscore'
sections = require './sections.coffee'

module.exports = class Nav
  constructor: ({ @artist, @auctionLotLabFeature }) -> #

  sections: ->
    @__sections__ ?= _.filter _.map(sections, _.clone), (section) =>
      section.href = @evaluateHref section
      if section.slug is 'auction-results'
        section.predicate(@artist.statuses) and @auctionLotLabFeature
      else
        section.predicate @artist.statuses

  evaluateHref: (section) ->
    '/' + section.href.replace ':id', @artist.id

  active: (currentPath) ->
    _.findWhere @sections(), href: currentPath?.split('?')[0]

  rels: (currentPath) ->
    i = @sections().indexOf @active(currentPath)
    prev: @sections()[i - 1], next: @sections()[i + 1]