(function () {
  'use strict'

  // DOM events
  var $document = $(document)

  $document.on('click', '.eoy-artist-feature .avant-garde-button-white', function (e) {
    analytics.track('Clicked EOY promotion read article', {
      destination_path: $(this).attr('href'),
    })
  })

  $document.on('click', '.eoy-artist-item', function () {
    analytics.track('Clicked EOY promotion artist', {
      slug: $(this).data('slug'),
      id: $(this).data('id')
    })
  })
})()
