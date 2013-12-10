module.exports =

  smartTruncate: (text, limit) ->
    size = 0
    textArray = for token in text.split(' ')
      size += (token.length + 1)
      break if size > limit
      token
    textArray.join(" ") + (if text.length > limit then "..." else "")
