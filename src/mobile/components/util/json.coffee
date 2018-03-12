module.exports =
  # remove newlines and other characters that cannot be embedded in an html script tag
  stringifyJSONForWeb: (json) ->
    JSON.stringify(json).replace(/</g, '\\u003c').replace(/-->/g, '--\\>')
