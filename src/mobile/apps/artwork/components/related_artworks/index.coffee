_ = require 'underscore'
Backbone = require 'backbone'
{ ARTWORK } = require('sharify').data
Artworks = require '../../../../collections/artworks.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
{ displayRelatedWorks } = require './display_related_works.coffee'

module.exports = ->
  isRelated = false

  context = ARTWORK.context || {}
  if context.__typename is 'ArtworkContextAuction'
    query = """
      query artwork($id: String!, $isOpen: Boolean!) {
        artwork(id: $id) {
          ... auction_artworks @include(if: $isOpen)
          ... artist_artworks @skip(if: $isOpen)
          ... related_artworks @skip(if: $isOpen)
        }
      }
      #{require './queries/auction_query.coffee'}
      #{require './queries/artist_query.coffee'}
      #{require './queries/related_query.coffee'}
    """
  else if context.__typename is 'ArtworkContextFair'
    query = """
      query artwork($id: String!, $isFairPartner: Boolean!) {
        artwork(id: $id) {
          ... fair_artworks
          ... artist_artworks
          ... partner_artworks @skip(if: $isFairPartner)
          ... related_artworks
        }
      }
      #{require './queries/fair_query.coffee'}
      #{require './queries/artist_query.coffee'}
      #{require './queries/partner_query.coffee'}
      #{require './queries/related_query.coffee'}
    """
  else if context.__typename is 'ArtworkContextPartnerShow'
    query = """
      query artwork($id: String!) {
        artwork(id: $id) {
          ... show_artworks
          ... artist_artworks
          ... partner_artworks
          ... related_artworks
        }
      }
      #{require './queries/show_query.coffee'}
      #{require './queries/artist_query.coffee'}
      #{require './queries/partner_query.coffee'}
      #{require './queries/related_query.coffee'}
    """
  else
    query = """
      query artwork($id: String!) {
        artwork(id: $id) {
          ... artist_artworks
          ... partner_artworks
          ... related_artworks
        }
      }
      #{require './queries/artist_query.coffee'}
      #{require './queries/partner_query.coffee'}
      #{require './queries/related_query.coffee'}
    """

  metaphysics
    query: query
    variables: { id: ARTWORK.id, isOpen: context.is_open, isActive: context.is_active, isFairPartner: ARTWORK.partner?.has_fair_partnership }

  .then ({ artwork }) ->
    if context.__typename is 'ArtworkContextAuction'
      auction_collection = if artwork.sale then new Artworks _.shuffle artwork.sale.artworks else []
      artist_collection = new Artworks _.shuffle artwork.artist?.artworks
      related_collection = new Artworks _.shuffle artwork.layer?.artworks

      if context.is_open
        relatedWorks = [{ collection: auction_collection, title: "Other Works from the Auction", typeName: context.__typename, href: artwork.sale.href, totalCount: artwork.sale?.eligible_sale_artworks_count }]
      else
        relatedWorks = [
          { collection: artist_collection, title: "Other Works by #{artwork.artist?.name}", typeName: 'artist', href: ARTWORK.artist?.href, totalCount: ARTWORK.artist?.counts?.artworks }
          { collection: related_collection, title: "Related Works", typeName: 'related', isRelated: true }
        ]
      displayRelatedWorks(relatedWorks, context)
    else if context.__typename is 'ArtworkContextFair'
      fair_collection = new Artworks _.shuffle artwork.shows[0]?.artworks
      artist_collection = new Artworks _.shuffle artwork.artist.artworks
      partner_collection = new Artworks _.shuffle artwork.partner?.artworks
      related_collection = new Artworks _.shuffle artwork.layer?.artworks

      relatedWorks = [
        { collection: fair_collection, title: 'Other Works from the Booth', typeName: context.__typename, href: artwork.shows[0]?.href, totalCount: artwork.shows[0]?.counts?.eligible_artworks }
        { collection: artist_collection, title: "Other Works by #{artwork.artist?.name}", typeName: 'artist', href: ARTWORK.artist?.href, totalCount: ARTWORK.artist?.counts?.artworks }
        { collection: partner_collection, title: "Other Works from #{artwork.partner?.name}", typeName: context.__typename, href: ARTWORK.partner?.href, totalCount: ARTWORK.partner?.counts?.artworks }
        { collection: related_collection, title: "Related Works", typeName: 'related', isRelated: true  }
      ]

      displayRelatedWorks(relatedWorks, context)
    else if context.__typename is 'ArtworkContextPartnerShow'
      show_collection = new Artworks _.shuffle artwork.shows[0]?.artworks
      artist_collection = new Artworks _.take _.shuffle(artwork.artist.artworks), 10
      partner_collection = new Artworks _.take _.shuffle(artwork.partner?.artworks), 10
      related_collection = new Artworks _.take _.shuffle(artwork.layer?.artworks), 10
      relatedWorks = [
        { collection: show_collection, title: 'Other Works from the Show', typeName: context.__typename, href: artwork.shows[0]?.href, totalCount: artwork.shows[0]?.counts?.eligible_artworks }
        { collection: artist_collection, title: "Other Works by #{artwork.artist.name}", typeName: 'artist', href: ARTWORK.artist?.href, totalCount: ARTWORK.artist?.counts?.artworks }
        { collection: partner_collection, title: "Other Works from #{artwork.partner.name}", typeName: 'gallery', href: ARTWORK.partner?.href, totalCount: ARTWORK.partner?.counts?.artworks }
        { collection: related_collection, title: "Related Works", typeName: 'related', isRelated: true  }
      ]

      displayRelatedWorks(relatedWorks, context)
    else
      artist_collection = new Artworks _.take _.shuffle(artwork.artist.artworks), 10
      partner_collection = new Artworks _.take _.shuffle(artwork.partner.artworks), 10
      related_collection = new Artworks _.take _.shuffle(artwork.layer?.artworks), 10
      relatedWorks = [
        { collection: artist_collection, title: "Other Works by #{artwork.artist.name}", typeName: 'artist', totalCount: ARTWORK.artist?.counts?.artworks, href: ARTWORK.artist?.href }
        { collection: partner_collection, title: "Other Works from #{artwork.partner.name}", typeName: 'gallery', href: ARTWORK.partner?.href, totalCount: ARTWORK.partner?.counts?.artworks }
        { collection: related_collection, title: "Related Works", typeName: 'related', isRelated: true  }
      ]

      displayRelatedWorks(relatedWorks, context)
