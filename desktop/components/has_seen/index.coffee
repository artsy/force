Dismisser = require './dismisser'

# Default expires is one year from now in seconds
module.exports = (name, expires = 31536000) ->
  dismisser = new Dismisser name: name, limit: 1, expires: expires
  if dismisser.dismissed()
    true
  else
    dismisser.dismiss()
    false
