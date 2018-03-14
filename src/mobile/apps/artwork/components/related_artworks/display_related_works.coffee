_ = require 'underscore'
{ ARTWORK } = require('sharify').data
template = -> require('./template.jade') arguments...
artworkColumnsTemplate = -> require('../../../../components/artwork_columns/template.jade') arguments...

module.exports =

  displayRelatedWorks: (collections, context) ->
    _.each(collections, (relatedWorks) ->
      if relatedWorks.collection.length > 0
        artworks = artworkColumnsTemplate
          artworkColumns: relatedWorks.collection.groupByColumnsInOrder()
          isAuction: context.__typename is 'ArtworkContextAuction' and context.is_open

        type = relatedWorks.typeName

        $section = $('.artwork-related-artworks').append template
          title: relatedWorks.title
          type: type
          isRelated: relatedWorks.isRelated
          href: relatedWorks.href
          totalCount: relatedWorks.totalCount

        $section.find("[data-artworks=#{type}]").html artworks
    )
