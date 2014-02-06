Profile = require '../../models/profile'

fetchProfile = (req, res, next, success) ->
  profile = new Profile { id: req.params.id }
  profile.fetch
    cache: true
    success: (profile) ->
      return next() unless profile and (profile.isUser() or profile.isPartner())
      res.locals.sd.PROFILE = profile.toJSON()
      success(profile)
    error: -> next()

getTemplateForProfileType = (profile) ->
  if profile.isPartner()
    "../partner/templates"
  else
    "templates"

@index = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    res.render getTemplateForProfileType(profile),
      profile : profile

@posts = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    if profile.get('posts_count')
      res.render getTemplateForProfileType(profile),
        profile : profile
    else
      res.redirect profile.href()

@favorites = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    if profile.isUser()
      res.render getTemplateForProfileType(profile),
        profile : profile
    else
      res.redirect profile.href()

@contact = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    if profile.isGallery()
      res.locals.sd.SECTION = 'contact'
      res.render getTemplateForProfileType(profile),
        profile : profile
    else
      res.redirect profile.href()

@about = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    if profile.isInstitution()
      res.locals.sd.SECTION = 'contact'
      res.render getTemplateForProfileType(profile),
        profile : profile
    else
      res.redirect profile.href()
