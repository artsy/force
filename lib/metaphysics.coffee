Q = require 'bluebird-q'
request = require 'superagent'
{ METAPHYSICS_ENDPOINT } = require('sharify').data

module.exports = ({ query, variables, req } = {}) ->
  Q.promise (resolve, reject) ->
    get = request.get METAPHYSICS_ENDPOINT

    if (token = req?.user?.get 'accessToken')?
      get.set 'X-ACCESS-TOKEN': token

    get
      .query
        query: query
        variables: JSON.stringify variables

      .end (err, response) ->
        return reject err if err?

        if response.body.errors?
          return reject JSON.stringify(response.body.errors)

        resolve response.body.data
