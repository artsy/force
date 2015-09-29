_ = require 'underscore'

module.exports = (remote = {}, options = {}) ->
  throw new Error 'requires `remote`' unless remote?

  settings = _.defaults options,
    limit: 4
    remote: remote
    identify: _.uniqueId 'bloodhound'
    datumTokenizer: Bloodhound.tokenizers.whitespace
    queryTokenizer: Bloodhound.tokenizers.whitespace

  # Bloodhound is exposed through typehead's require within
  # ./components/main_layout/client.coffee
  new Bloodhound settings
