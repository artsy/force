_ = require 'underscore'
IS_TEST_ENV = require('sharify').data.NODE_ENV not in ['production', 'staging', 'development']

module.exports = (remote = {}, options = {}) ->
  throw new Error 'requires `remote`' unless remote?

  return { initialize: (->) } if IS_TEST_ENV

  settings = _.defaults options,
    limit: 4
    remote: remote
    identify: _.uniqueId 'bloodhound'
    datumTokenizer: Bloodhound.tokenizers.whitespace
    queryTokenizer: Bloodhound.tokenizers.whitespace

  new Bloodhound settings
