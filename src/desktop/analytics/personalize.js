(function () {
  'use strict'
  // DOM events
  var $document = $(document)

  $document.on('click', '.personalize-introduction-edit', function (e) {
    analytics.track('Clicked "Edit" on introduction step of personalize flow')
  })

  analyticsHooks.on('current_user:changed-name', function () {
    analytics.track('Changed name on introduction step of personalize flow')
  })

  analyticsHooks.on('personalize:reonboarding', function () {
    analytics.track('Started re-onboarding')
  })

  analyticsHooks.on('personalize:finished', function (data) {
    analytics.track('Finished personalize', data)
  })

  analyticsHooks.on('personalize:added-artist', function (data) {
    analytics.track('Added an artist to their collection from /personalize', data)
  })

  analyticsHooks.on('personalize:removed-artist', function (data) {
    analytics.track('Removed an artist from their collection from /personalize', data)
  })

  analyticsHooks.on('personalize:collector_level', function (data) {
    analytics.track('Personalize collector level:' + data.value, { label: data.label })
  })

  analyticsHooks.on('personalize:advance', function (data) {
    analytics.track('Finishing Personalize ' + data.value, { label: data.label })
  })

  analyticsHooks.on('personalize:step', function (data) {
    analytics.track(data.message, { label: data.label })
  })
})()

