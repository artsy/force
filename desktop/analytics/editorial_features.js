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
    label = location.pathname.split('venice-biennale/')[1]
    analytics.track('Video play', {
      context_type: 'venice_biennale_2017',
      context_label: label || ''
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
  }).on('click', '.webvr-button', function() {
    analytics.track('VR Mode', {
      context_type: 'venice_biennale_2017'
    })
  }).on('click', '.venice-carousel .mgr-arrow-left', function() {
    analytics.track('Carousel click', {
      context_type: 'venice_biennale_2017',
      context_label: 'previous_page_in_carousel'
    })
  }).on('click', '.venice-carousel .mgr-arrow-right', function() {
    analytics.track('Carousel click', {
      context_type: 'venice_biennale_2017',
      context_label: 'next_page_in_carousel'
    })
  })

  analyticsHooks.on('video:duration', function (options) {
    analytics.track('Video duration', {
      percent_complete: options.duration,
      context_type: 'venice_biennale_2017',
      context_label: options.slug
    })
  })

  analyticsHooks.on('video:seconds', function (options) {
    analytics.track('Video seconds', {
      seconds_complete: options.seconds,
      context_type: 'venice_biennale_2017',
      context_label: options.slug
    })
  })

  analyticsHooks.on('email:signup', function (options) {
    analytics.track('Sign up for editorial email', {
      user_email: options.user_email,
      context_type: 'venice_biennale_2017'
    })
  })
}