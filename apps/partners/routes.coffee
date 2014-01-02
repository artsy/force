_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
OrderedSets   = require '../../collections/ordered_sets.coffee'
Partner       = require '../../models/partner'
Profiles      = require '../../collections/profiles'
Q             = require 'q'

@index = (req, res) ->
  featuredPartners = OrderedSets.new({ key: 'partners:featured-partners' })
  # Fetch the featured partners (OrderedSet)
  featuredPartners.fetch({ cache: true }).then ->
    featuredPartners = featuredPartners.first()
    # Fetch the OrderedSets Items as Profiles
    url = "#{sd.ARTSY_URL}/api/v1/set/#{featuredPartners.get('id')}/items"
    profiles = new Profiles []
    profiles.fetch({ url: url, cache: true }).then ->
      # For each Profile, set a Partner and fetch/set that Partner's Locations
      Q.allSettled(_.map(profiles.models, (profile) ->
        partner = new Partner(profile.get('owner'))
        profile.set 'owner', partner
        return partner.locations().fetch()
      )).then ->
        # Final data set is a collection of profiles with populated
        # partners and locations
        res.render 'template',
          featuredPartnerProfiles: profiles
