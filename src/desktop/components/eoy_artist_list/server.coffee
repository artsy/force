cache = require '../../lib/cache.coffee'
JSONPage = require '../json_page/index.coffee'

page = new JSONPage name: 'eoy_2016'

module.exports = ->
  new Promise (resolve, reject) ->
    cache.get "eoy-2016", (err, cachedData) ->
      return reject(err) if err
      return resolve(JSON.parse(cachedData)) if cachedData

      page.get (err, data) ->
        return reject(err) if err
        cache.set "eoy-2016", JSON.stringify(data)
        resolve(data)

