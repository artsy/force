sd = require('sharify').data

# simulates a click for eigen views that don't
# like it when you set window.location

module.exports = (location) ->
  return window.location = location unless sd.EIGEN
  a = document.createElement 'a'
  a.setAttribute 'href', location

  dispatch = new Event 'click', { 'bubbles': true, 'cancelable': true }

  {
    event: dispatch
    didDispatch: a.dispatchEvent dispatch
  }
