module.exports.init = ->
  $('.js-categories-header-jump-link').click ->
    offset = $('#main-layout-header').outerHeight()
    top = $('.js-categories-az-header').offset().top - offset
    $('html, body').animate scrollTop: top
