module.exports = ->
  $('.js-artwork-tab-link').click (e) ->
    id = $(e.currentTarget).attr 'data-id'
    $(e.currentTarget).toggleClass('is-active')
    $('.js-artwork-item').filter("[data-id=#{id}]").toggleClass('is-active')
