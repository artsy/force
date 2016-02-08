module.exports = ->
  $links = $('.js-artwork-tabs__nav__link')
  $sections = $links.add $('.js-artwork-tab')

  $links.click (e) ->
    e.preventDefault()
    id = $(this).data 'id'
    $sections
      .attr 'data-state', 'inactive'
      .filter "[data-id=#{id}]"
      .attr 'data-state', 'active'
