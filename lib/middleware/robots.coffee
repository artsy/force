#
# Renders a dynamic robots.txt based off config
#

{ APP_URL } = require '../../config'

module.exports = (req, res, next) ->
  res.send  "Sitemap: #{APP_URL}/sitemap.xml\n"