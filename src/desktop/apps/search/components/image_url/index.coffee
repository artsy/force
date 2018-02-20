artsyXapp = require 'artsy-xapp'
{ API_URL } = require('sharify').data

module.exports = (modelName, id) ->
  modelName = if modelName is 'partnershow' then 'partner_show' else modelName
  src = if modelName in ['artwork', 'partner_show'] then 'default_image.jpg' else 'image'
  "#{API_URL}/api/v1/#{modelName}/#{id}/#{src}?xapp_token=#{artsyXapp.token}"
