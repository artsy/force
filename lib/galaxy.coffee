{ GALAXY_URL, GALAXY_PUBLISHABLE_TOKEN } = require('sharify').data

module.exports =
  headers:
    Accept: 'application/vnd.galaxy-public+json'

  url: (kind) ->
    "#{GALAXY_URL}/#{kind}?token=#{GALAXY_PUBLISHABLE_TOKEN}"
