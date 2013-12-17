# serverside SSL helper
module.exports =

  isSSL: (req, SECURE_APP_URL) ->
    (req.protocol || 'http') is SECURE_APP_URL?.match(/^https?/)[0]
