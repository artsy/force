artsyXapp = require 'artsy-xapp'
{ API_URL } = require('sharify').data
{ fill } = require '../../../../components/resizer'

module.exports = (modelName, id) ->
  modelName = if modelName is 'partnershow' then 'partner_show' else modelName
  src = if modelName in ['artwork', 'partner_show'] then 'default_image.jpg' else 'image'
  url = "#{API_URL}/api/v1/#{modelName}/#{id}/#{src}?xapp_token=#{artsyXapp.token}"
  fill url, width: 140, height: 140, color: 'fff'
