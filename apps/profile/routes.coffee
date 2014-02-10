Profile = require '../../models/profile'

{ overview, fairPosts } = require '../fair/routes'

fetchProfile = (req, res, next, success) ->
  profile = new Profile { id: req.params.id }
  profile.fetch
    cache: true
    success: (profile) ->
      return next() unless profile and (profile.isUser() or profile.isPartner() or profile.isFairOranizer())
      res.locals.sd.PROFILE = profile.toJSON()
      success(profile)
    error: -> next()

getTemplateForProfileType = (profile) ->
  if profile.isFairOranizer()
    "../fair/templates"
  else if profile.isPartner()
    "../partner/templates"
  else
    "templates"

@index = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    return overview(req, res, next) if profile.isFairOranizer()
    res.render getTemplateForProfileType(profile),
      profile : profile

@posts = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    return fairPosts(req, res, next) if profile.isFairOranizer()
    if profile.get('posts_count') > 0 or profile.get('reposts_count') > 0
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

#
# Gallery and Intitution routes
#
@shows = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    if profile.isPartner()
      res.locals.sd.SECTION = 'shows'
      res.render getTemplateForProfileType(profile),
        profile : profile
    else
      res.redirect profile.href()

#
# Gallery only routes
#
@contact = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    if profile.isGallery()
      res.locals.sd.SECTION = 'contact'
      res.render getTemplateForProfileType(profile),
        profile : profile
    else
      res.redirect profile.href()


#
# Institution only routes
#
@about = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    if profile.isInstitution()
      res.locals.sd.SECTION = 'contact'
      res.render getTemplateForProfileType(profile),
        profile : profile
    else
      res.redirect profile.href()

@collection = (req, res, next) ->
  fetchProfile req, res, next, (profile) ->
    if profile.isInstitution()
      res.locals.sd.SECTION = 'collection'
      res.render getTemplateForProfileType(profile),
        profile : profile
    else
      res.redirect profile.href()
