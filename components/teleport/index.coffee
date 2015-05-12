sd = require('sharify').data

# simulates a click for eigen views that don't
# it when you set window.location

module.exports = (location) ->
  a = document.createElement 'a'
  a.setAttribute 'href', location

  dispatch = document.createEvent 'HTMLEvents'
  dispatch.initEvent 'click', true, true

  {
    event: dispatch
    didDispatch: a.dispatchEvent dispatch
  }