{ SECURE_APP_URL } = require('../../config')

@index = (req, res) ->
  # SECURE_APP_URL in development uses http while staging and production use https, so match with a regex to avoid redirect loop.
  unless req.protocol is SECURE_APP_URL.match(/^https?/)[0]
    res.redirect SECURE_APP_URL + '/order'
  res.render 'template'