if (location.pathname.indexOf('/2016-year-in-art') > -1) {

  setTimeout(function () {
    analytics.track('time on page more than 30 seconds', { category: '30 Seconds', message: sd.CURRENT_PATH })
  }, 30000)

  analyticsHooks.on('scroll:sa-body', function () {
    analytics.track('EOY2016 Scroll Into Body', {
      destination_path: null,
      impression_type: 'scroll_body'
    })
  })

}

if (location.pathname.indexOf('/venice-biennale') > -1) {
  $(document.body).on('click', '.venice-body__partner, .venice-nav__sticky-ubs-logo', function () {
    analytics.track('Clicked partner logo', {
      destination_path: $(this)[0].href.replace(/^.*\/\/[^\/]+/, ''),
      impression_type: 'ubs_logo',
      context_type: 'venice_biennale_2017'
    })
  }).on('click', '.venice-overlay__play', function() {
    analytics.track('Video play', {
      destination_path: null,
      impression_type: 'video_play',
      context_type: 'venice_biennale_2017'
    })
  })

  analyticsHooks.on('video:duration', function (options) {
    analytics.track('Video duration', {
      destination_path: null,
      impression_type: 'video_duration',
      percent_complete: options.duration,
      context_type: 'venice_biennale_2017'
    })
  })

  analyticsHooks.on('video:dropoff', function (options) {
    analytics.track('Video dropoff', {
      destination_path: null,
      time: options.dropoff,
      impression_type: 'video_dropoff',
      context_type: 'venice_biennale_2017'
    })
  })
}