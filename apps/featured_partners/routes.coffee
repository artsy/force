_           = require 'underscore'
sd          = require('sharify').data
Backbone    = require 'backbone'
Items       = require '../../collections/items.coffee'
OrderedSets = require '../../collections/ordered_sets.coffee'
Partner     = require '../../models/partner'
Partners    = require '../../collections/partners'
Profile     = require '../../models/profile'
Q           = require 'Q'

#@galleries = (req, res) ->

#@institutions = (req, res) ->

@partners = (req, res) ->
  featuredPartners = OrderedSets.new({ key: 'partners:featured-partners' })
  # Fetch the featured partners (OrderedSet)
  featuredPartners.fetch().then ->
    featuredPartners = featuredPartners.first()
    # Fetch the OrderedSets Items as Profiles
    url = "#{sd.ARTSY_URL}/api/v1/set/#{featuredPartners.get('id')}/items"
    profiles = new Backbone.Collection([], { model: Profile })
    profiles.fetch({ url: url }).then ->
      # For each Profile, set a Partner and fetch/set that Partner's Locations
      Q.allSettled(_.map(profiles.models, (profile) ->
        partner = new Partner(profile.get('owner'))
        profile.set 'owner', partner
        return partner.locations().fetch()
      )).then ->
        # Whew! All done. A collection of profiles with populated partner
        # with populated locations
        res.render 'template', {
          featuredPartnerProfiles: profiles
        }
