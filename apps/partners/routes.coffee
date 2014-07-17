_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
OrderedSets = require '../../collections/ordered_sets.coffee'
Partner = require '../../models/partner'
Profiles = require '../../collections/profiles'
Q = require 'q'

@index = (req, res) ->
  featuredPartners = new OrderedSets(key: 'partners:featured-partners')
  # Fetch the featured partners (OrderedSet)
  featuredPartners.fetchAll({ cache: true }).then ->
    profiles = featuredPartners.first().get('items')
    # For each Profile, set a Partner and fetch/set that Partner's Locations
    Q.allSettled(profiles.map (profile) ->
      partner = new Partner(profile.get('owner'))
      profile.set 'owner', partner
      return partner.locations().fetch({ cache: true })
    ).then ->
      # Final data set is a collection of profiles with populated
      # partners and locations
      res.locals.sd.PROFILES = profiles
      res.render 'template',
        featuredPartnerProfiles: profiles
