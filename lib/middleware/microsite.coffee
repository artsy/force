{ parse, format } = require 'url'

#
# Checks for the presence of a microsite flag in the query string,
# as well as query params for fair_id, fair_name, and profile_id,
# then sets up the locals such that there are the needed skeleton
# models for rendering the fair header and attaching a search view to it
#

module.exports = (req, res, next) ->
  microsite = res.locals.sd.MICROSITE =
    (qs = req.query).microsite? and qs.fair_id? and qs.fair_name? and qs.profile_id?

  if microsite
    Profile   = require '../../models/profile.coffee'
    Fair      = require '../../models/fair.coffee'

    fair = res.locals.micrositeFair = new Fair
      id: qs.fair_id
      name: qs.fair_name
      organizer: profile_id: qs.profile_id

    image_url   = "#{res.locals.sd.API_URL}/api/v1/profile/#{qs.profile_id}/image"
    image_url   = image_url + "?xapp_token=#{res.locals.sd.ARTSY_XAPP_TOKEN}" if res.locals.sd.ARTSY_XAPP_TOKEN?

    profile = res.locals.micrositeProfile = new Profile id: qs.profile_id, image_url: image_url

    res.locals.sd.MICROSITE_FAIR      = fair.toJSON()
    res.locals.sd.MICROSITE_PROFILE   = profile.toJSON()
    res.locals.sd.HIDE_HEADER         = true

  next()
