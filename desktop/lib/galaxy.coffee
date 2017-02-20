{ GALAXY_URL, GALAXY_PUBLISHABLE_TOKEN } = require('sharify').data

module.exports =
  headers:
    Accept: 'application/vnd.galaxy-public+json'

  url: (kind) ->
    url = "#{GALAXY_URL}/#{kind}?token=#{GALAXY_PUBLISHABLE_TOKEN}"
    url += '&artsy_only=true' if kind is 'galleries' # Temporarily limit gallery results
    url
