raf = window.requestAnimationFrame or
  window.webkitRequestAnimationFrame or
  window.mozRequestAnimationFrame or
  window.oRequestAnimationFrame or
  window.msRequestAnimationFrame

module.exports = (callback) ->
  ->
    return if wait
    wait = true
    raf =>
      callback arguments...
      wait = false
