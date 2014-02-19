{ parse, format } = require 'url'

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

    image_url   = "#{res.locals.sd.ARTSY_URL}/api/v1/profile/#{qs.profile_id}/image"
    image_url   = image_url + "?xapp_token=#{res.locals.sd.ARTSY_XAPP_TOKEN}" if res.locals.sd.ARTSY_XAPP_TOKEN?

    profile = res.locals.micrositeProfile = new Profile id: qs.profile_id, image_url: image_url

    res.locals.sd.MICROSITE_FAIR      = fair.toJSON()
    res.locals.sd.MICROSITE_PROFILE   = profile.toJSON()

  next()
