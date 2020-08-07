_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Partner = require '../../models/partner'
Profiles = require '../../collections/profiles'

module.exports.index = (req, res) ->
  new Backbone.Collection([]).fetch
    url: "#{sd.API_URL}/api/v1/sets"
    cache: true
    data: { key: 'partners:featured-partners' }
    success: (sets) ->
      set = sets.first()
      new Profiles([]).fetchUntilEnd
        url: "#{sd.API_URL}/api/v1/set/#{set.get 'id'}/items"
        cache: true
        success: (profiles) ->
          # For each Profile, set a Partner and fetch/set that Partner's Locations
          Promise.allSettled(profiles.map (profile) ->
            partner = new Partner profile.get('owner')
            profile.set 'owner', partner
            return partner.fetchLocations
              cache: true
              success: (locations) ->
                partner.set 'locations', locations
          ).then ->
            # Final data set is a collection of profiles with populated
            # partners and locations
            res.locals.sd.PROFILES = profiles
            res.render 'template',
              featuredPartnerProfiles: profiles
