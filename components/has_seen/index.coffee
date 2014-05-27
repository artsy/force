Cookies = require 'cookies-js'

# Default expires is one year from now in seconds
module.exports = (name, expires = 31536000) ->
  if Cookies.get(name)?
    true
  else
    Cookies.set name, true, expires: expires
    false
