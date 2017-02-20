module.exports = (src, callback) ->
  script = document.createElement 'script'
  script.async = 'async'
  script.src = src
  script.onload = callback if callback
  document.getElementsByTagName('head')[0].appendChild script
