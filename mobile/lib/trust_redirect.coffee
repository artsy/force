qs = require 'querystring'
{ API_URL, ARTSY_URL, CURRENT_USER } = require('sharify').data

ajax = ->
  $.ajax arguments...

location = (path) ->
  window.location = ARTSY_URL + path

redirect = (to) -> (token) ->
  location if token?
    [path, query] = to.split '?'
    params = qs.parse query
    params.trust_token = token
    path += "?#{qs.stringify params}"
  else
    to

token = (re) ->
  ajax
    type: 'POST'
    url: "#{API_URL}/api/v1/me/trust_token"
    error: re
    success: ({ trust_token }) ->
      re trust_token

module.exports = (to) ->
  re = redirect to

  if CURRENT_USER?
    token re
  else
    re()
