# serverside SSL helper
module.exports =

  isSSL: (req) -> req.protocol is 'https'
