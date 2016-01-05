_ = require 'underscore'
_s = require 'underscore.string'

module.exports.modelNameAndIdToLabel = (modelName, id) ->
  throw new Error('Requires modelName and id') unless modelName? and id?
  "#{_s.capitalize(modelName)}:#{id}"
