var _s = require('underscore.string')

module.exports.modelNameAndIdToLabel = function (modelName, id) {
  if (!modelName && !id) {
    throw new Error('Requires modelName and id')
  }
  return (_s.capitalize(modelName) + ':' + id)
}
