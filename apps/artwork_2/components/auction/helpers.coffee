module.exports =
  pluralize: (word, count, irregular = null) ->
    if count is 1
      "#{count} #{word}"
    else
      "#{count} #{irregular or word + 's'}"
