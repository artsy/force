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

partnerFromProfile = (profile) ->
  if profile.isPartner()
    new Partner profile.get('owner')
  else
    false

@contact = (req, res) ->
  return next() unless (profile = req.profile)?.isGallery()
  res.locals.sd.PROFILE = profile.toJSON()
  res.locals.sd.SECTION = 'contact'
  res.render 'templates', profile: profile

@about = (req, res) ->
  return next() unless (profile = req.profile)?.isInstitution()
  res.locals.sd.PROFILE = profile.toJSON()
  res.locals.sd.SECTION = 'contact'
  res.render 'templates', profile: profile
