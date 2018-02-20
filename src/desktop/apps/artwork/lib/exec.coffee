module.exports = (fns, data) ->
  for fn in fns
    try
      fn(data)
    catch err
      console.error err
