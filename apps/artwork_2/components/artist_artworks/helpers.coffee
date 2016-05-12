masonry = require '../../../../components/artwork_masonry/index.coffee'

module.exports =
  masonry: masonry

  pluralize: (word, count, irregular = null) ->
    if parseInt(count.replace(/,/g, ''), 10) is 1
      word
    else
      irregular or word + 's'
