#
# Routes that clear redis caches
#

cache = require './../cache.coffee'
client = cache.client

@bustFairCache = (req, res, next) ->
  fairId = req.params.id
  if client
    client.del("fair:#{fairId}")
    res.redirect "/#{fairId}"    
  else
    res.redirect "/#{fairId}"