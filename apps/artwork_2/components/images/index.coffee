module.exports = ->
  $el = $('.js-artwork-images')

  $imgs = $el.find '.js-artwork-images__images__image'
  $pages = $el.find '.js-artwork-images__pages__page'

  activate = (id) ->
    $active = $imgs.add($pages)
      .attr 'data-state', 'inactive'
      .filter "[data-id=#{id}]"

    $loader = $active
      .attr 'data-state', 'active'
      .find '.js-artwork-images__images__image__display'

    $loader
      .css 'background-image': "url(#{$loader.data('src')})"
      .imagesLoaded { background: true }, ->
        $loader.attr 'data-state', 'loaded'

  activate $imgs.last().data 'id'

  $pages.click (e) ->
    e.preventDefault()
    id = $(this).data 'id'
    activate id
