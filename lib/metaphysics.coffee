Q = require 'bluebird-q'
request = require 'superagent'
{ METAPHYSICS_ENDPOINT } = require('sharify').data

module.exports = (options = {}) ->
  Q.promise (resolve, reject) ->
    request
      .get METAPHYSICS_ENDPOINT
      .query query: options.query, variables: JSON.stringify(options.variables)
      .end (err, response) ->
        return reject err if err?
        return reject response.body.errors if response.body.errors?
        resolve response.body.data
