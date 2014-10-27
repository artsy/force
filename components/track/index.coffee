services = require './services.coffee'

# action, description => mixpanel, google
# action, category => snowplow
module.exports = (options = {}) ->
  services.mixpanel options
  services.google options
  services.snowplow options
