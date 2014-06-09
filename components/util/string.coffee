module.exports =

  smartTruncate: (text, limit=200) ->
    return unless text
    size = 0
    textArray = for token in text.split(' ')
      size += (token.length + 1)
      break if size > limit
      token
    textArray.join(" ") + (if text.length > limit then "..." else "")

  underscore: (text) ->
    return unless text
    text.toLowerCase().replace(/[\s]+/g, '_')
