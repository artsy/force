_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
Partner       = require '../../models/partner'
Profile       = require '../../models/profile'

@setProfile = (req, res, next) ->
  new Profile(id: req.params.id).fetch
    cache: true
    success: (profile) -> req.profile = profile; next()
    error: -> next()

partnerFromProfile = (req) ->
  if req.profile?.isPartner()
    new Partner req.profile.get('owner')
  else
    false

@contact = (req, res) ->
  return next() unless (profile = req.profile)?.isPartner()
  res.locals.sd.PROFILE = profile.toJSON()
  res.locals.sd.CURRENT_TAB = 'contact'
  res.render 'templates', profile: profile
