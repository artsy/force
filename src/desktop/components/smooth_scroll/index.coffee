module.exports = (el, duration = 200) ->
  offset = 53 # `main-header-height`
  top = $(document.body).scrollTop()
  position = $(el).offset().top - offset

  $('html, body')
    .animate scrollTop: position, duration
