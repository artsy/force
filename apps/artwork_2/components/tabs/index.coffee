module.exports = ($el) ->
  $el ?= $('.js-artwork-tabs')
  $links = $el.find('.js-artwork-tabs__nav__link')
  $sections = $links.add $el.find('.js-artwork-tab')

  $links.click (e) ->
    e.preventDefault()
    id = $(this).data 'id'
    $sections
      .attr 'data-state', 'inactive'
      .filter "[data-id=#{id}]"
      .attr 'data-state', 'active'
