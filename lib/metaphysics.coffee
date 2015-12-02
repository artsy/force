Q = require 'bluebird-q'
request = require 'superagent'
{ METAPHYSICS_ENDPOINT } = require('sharify').data

module.exports = (query, variables) ->
  console.log variables
  Q.promise (resolve, reject) ->
    request
      .get METAPHYSICS_ENDPOINT
      .query query: query, variables: JSON.stringify(variables)
      .end (err, response) ->
        return reject err if err?
        return reject response.body.errors if response.body.errors?
        resolve response.body.data
