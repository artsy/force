module.exports = (fns) ->
  for fn in fns
    try
      fn()
    catch err
      console.error err
