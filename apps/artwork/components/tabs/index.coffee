module.exports = ($els) ->
  return unless $els.length

  $els.map ->
    $el = $(this)

    $links = $el.find '.js-artwork-tabs-link'
    $sections = $links.add $el.find '.js-artwork-tabs-section'

    $links.click (e) ->
      e.preventDefault()

      id = $(this).data 'id'

      $sections
        .attr 'data-state', 'inactive'
        .filter "[data-id=#{id}]"
        .attr 'data-state', 'active'
        .trigger 'artwork_tab:changed', id
