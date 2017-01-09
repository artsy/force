(function () {
  'use strict'

  analyticsHooks.on('cf:followed_artists:checked', function (data) {
    analytics.track('Click', {
      type: 'checkbox',
      label: 'Artists you follow',
      context_module: 'collect_sidebar'
    })
  })

  $(document).on('click', '.cf-popular_artists__row', function (e) {
    var $row = $(e.currentTarget)

    analytics.track('Click', {
      label: 'Popular Artists',
      context_module: 'popular artists widget',
      type: 'link',
      destination_path: $row.data('href')
    })
  })

})()
