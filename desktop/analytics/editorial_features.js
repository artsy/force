if (location.pathname.match('/2016-year-in-art')) {

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

if (location.pathname.match('/venice-biennale')) {
  $(document.body).on('click', '.venice-body__partner, .venice-nav__sticky-ubs-logo', function () {
    analytics.track('Clicked primary partner logo', {
      destination_path: $(this)[0].href.replace(/^.*\/\/[^\/]+/, ''),
      impression_type: 'sa_primary_logo',
      context_type: 'article_fixed'
    })
  }).on('click', '.venice-overlay__play', function() {
    analytics.track('Video play', {
      destination_path: null,
      impression_type: 'video_play',
      context_type: 'article_fixed'
    })
  })

  analyticsHooks.on('video:duration', function (options) {
    analytics.track('Venice duration', {
      destination_path: null,
      impression_type: options.duration
    })
  })
}