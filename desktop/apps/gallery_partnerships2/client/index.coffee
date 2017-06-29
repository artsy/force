initCarousel = require '../../../components/merry_go_round/index.coffee'

module.exports.init = ->
  initCarousel $('.js-partner-stats-slideshow'), { autoPlay: 2500, wrapAround: true }
  initCarousel $('.js-partner-testimonials-slideshow'), { autoPlay: 2500, wrapAround: true, prevNextButtons: false }

  $('.gallery-partnerships2__connect-with-collectors').waypoint ((direction) ->
    $('.gallery-partnerships2__connect-with-collectors__sub_image').css(display: 'inline', animation: 'popup 0.2s') if direction == 'down'
  ),
    offset: '30%'

  $('.gallery-partnerships2__connect-with-collectors').waypoint ((direction) ->
    $('.gallery-partnerships2__connect-with-collectors__sub_image').css(display: 'none') if direction == 'up'
  ),
    offset: '80%'

  $('.gallery-partnerships2__connect-with-collectors').waypoint ((direction) ->
    $('.gallery-partnerships2__connect-with-collectors__sub_image').css(display: 'inline', animation: 'popup 0.2s') if direction == 'up'
  ),
    offset: '0%'

  $('.gallery-partnerships2__connect-with-collectors').waypoint ((direction) ->
    $('.gallery-partnerships2__connect-with-collectors__sub_image').css(display: 'none') if direction == 'down'
  ),
    offset: '-50%'

  $('.js-gallery-partnerships2-button').click (event) ->
    event.preventDefault()
    $('html, body').animate({ scrollTop: $('#gallery-partnership2-form').offset().top }, 500)
