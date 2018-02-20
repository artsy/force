(function () {
  'use strict'

  var railId = function (e) {
    return $(e.target).closest('.arv-inner').data('rail')
  }

  // DOM events
  var $document = $(document)

  $document.on('click', '.arv-view-all', function (e) {
    analytics.track('Clicked "view all" on artwork rail', { rail: railId(e) })
  })

  $document.on('click', '.arv-carousel-arrow-next', function (e) {
    analytics.track('Clicked next on artwork rail carousel', { rail: railId(e) })
  })

  $document.on('click', '.arv-carousel-arrow-prev', function (e) {
    analytics.track('Clicked previous on artwork rail carousel', { rail: railId(e) })
  })

  $document.on('click', '.arv-fillwidth-row a', function (e) {
    analytics.track('Clicked artwork on artwork rail', { rail: railId(e) })
  })

  analyticsHooks.on('rail:clicked-contact', function (e) {
    analytics.track('Clicked "Contact Gallery" from artwork rail', { rail: railId(e) })
  })
})()
