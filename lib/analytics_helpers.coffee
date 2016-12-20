#
# Tiny helper to concat a model name and id for analytics purposes
# TODO: Refactor out this anemic lib, we can just do this inside the
# /analytics code
#
_s = require('underscore.string')

module.exports.modelNameAndIdToLabel = (modelName, id) =>
  throw new Error('Requires modelName and id') if !modelName && !id
  return (_s.capitalize(modelName) + ':' + id)
