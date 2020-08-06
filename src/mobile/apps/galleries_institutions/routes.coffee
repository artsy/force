_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
require '../../../lib/promiseDone'
{ FeaturedCities, Cities } = require 'places'
Profiles = require '../../collections/profiles'
Partners = require '../../collections/partners'

partnerOptions = (type) ->
  {
    galleries:
      partnerType: 'galleries'
      partnerHeader: 'Galleries'
      partnerPlural: 'Galleries'
      setID: "542c487b7261692f5a890800"
    institutions:
      partnerType: 'institutions'
      partnerHeader: 'Museums, Institutions and Non-Profits'
      partnerPlural: 'Museums'
      setID: "542c3d0c7261692cc4510200"
  }[type]

module.exports.index = (req, res, next) ->
  options = partnerOptions req.path.split('/')[1]

  profiles = new Profiles
  profiles.fetchUntilEndInParallel
    url: "#{sd.API_URL}/api/v1/set/#{options.setID}/items"
    data: size: 20
    cache: true
    error: res.backboneError
    success: ->
      res.render 'index',
        copy: options
        featuredCities: FeaturedCities
        featuredPartner: _.first(profiles.shuffle())

module.exports.galleries_institutions = (req, res, next) ->
  return next() unless req.params.city
  city = _.findWhere Cities, slug: req.params.city
  return next() unless city?

  type = req.path.split('/')[1]

  { partnerPlural } = partnerOptions type

  options =
    size: 20
    active: true
    type: Partners.types[type]
    sort: 'sortable_id'
    has_full_profile: true
    partnerPlural: partnerPlural

  _.extend options, near: city.coords.toString()

  partners = new Partners
  partners.fetchUntilEndInParallel
    cache: true
    data: options
  .then ->
    res.locals.sd.CITY = city
    res.locals.sd.PARTNERS = partners.map (partner) -> partner.pick('id', 'name')

    res.render 'partners',
      city: city
      aToZGroup: partners.groupByAlpha()

  .catch next
  .done()
