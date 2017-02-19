(function () {
  'use strict'

  // DOM events
  var $document = $(document)

  $document.on('click', '.afc-next', function (e) {
    analytics.track('Next page in /artists carousel')
  })

  $document.on('click', '.afc-prev', function (e) {
    analytics.track('Previous page in /artists carousel')
  })
})()
