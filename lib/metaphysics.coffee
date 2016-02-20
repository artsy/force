Q = require 'bluebird-q'
qs = require 'qs'
request = require 'superagent'
{ extend } = require 'underscore'
{ METAPHYSICS_ENDPOINT } = require('sharify').data

token = "JvTPWe4WsQO-xqX6Bts49h01NGmSNMw29Tudta6f7iecsQ0NvIWM4k4D25vQj4yxWizycrsbN4TuCX9cdUnAdEk3aIiOVgI8liIo4959mgqBI1Fa-DZcT1smNP_NNmseTu6PU9-Osp-re3JqQwE2yYa6Msgjeg3FgcxIlwFggNV1BD8q0CoT_8c3RQAmM08DblErpYQB6niRAoWyqufBO7-X4gk5Dau_x7dJ8XQ_t9Pxpcv7wA7JiMdUUamy0aYIj_xGZdAZsBUMNY5CVEB8IzIsmRwiBVIgjsQQVBayCT8="

metaphysics = ({ query, variables, req } = {}) ->
  Q.promise (resolve, reject) ->
    get = request
      .get METAPHYSICS_ENDPOINT
      .set 'Accept', 'application/json'

    # if (token = req?.user?.get 'accessToken')?
    if token
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

metaphysics.debug = (req, res, send) ->
  if req.query.query?
    get = extend {}, send, variables: JSON.stringify send.variables
    res.redirect "#{METAPHYSICS_ENDPOINT}?#{qs.stringify get}"
    true

module.exports = metaphysics
