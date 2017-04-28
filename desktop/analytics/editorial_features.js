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
      context_type: 'venice_biennale_2017'
    })
  }).on('click', '.venice-overlay__play', function() {
    analytics.track('Video play', {
      context_type: 'venice_biennale_2017'
    })
  }).on('click', '.share-to-twitter', function() {
    analytics.track('Article share', {
      service: 'twitter',
      context_type: 'venice_biennale_2017'
    })
  }).on('click', '.share-to-facebook', function() {
    analytics.track('Article share', {
      service: 'facebook',
      context_type: 'venice_biennale_2017'
    })
  }).on('click', '.share-by-email', function() {
    analytics.track('Article share', {
      service: 'email',
      context_type: 'venice_biennale_2017'
    })
  })

  analyticsHooks.on('video:duration', function (options) {
    analytics.track('Video duration', {
      percent_complete: options.duration,
      context_type: 'venice_biennale_2017'
    })
  })

  analyticsHooks.on('video:dropoff', function (options) {
    analytics.track('Video dropoff', {
      time: options.dropoff,
      context_type: 'venice_biennale_2017'
    })
  })

  analyticsHooks.on('email:signup', function (options) {
    analytics.track('Sign up for editorial email', {
      user_email: options.user_email,
      context_type: 'venice_biennale_2017'
    })
  })
}