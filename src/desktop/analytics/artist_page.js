if (location.pathname.match('/artist/.*') && sd.ARTIST) {
  $('.artist-tabs a').click(function(e) {
    const tab = $(e.target).text()
    analytics.track('Clicked artist page tab', { tab: tab })
  })

  $('.artist-carousel a').click(function() {
    analytics.track('Click', {
      type: 'thumbnail',
      destination_path: $(this).attr('href'),
      context_module: 'carousel',
    })
  })

  $('.artist-page-content .gradient-blurb-read-more').click(function(e) {
    analytics.track('Clicked to expand artist bio header')
  })

  analyticsHooks.on('artist_page:cta:shown', function() {
    analytics.track('Show artist page sign up prompt')
  })

  analyticsHooks.on('artist_page:cta:hidden', function() {
    analytics.track('Click', {
      context_module: 'artist page signup prompt',
      type: 'dismiss',
    })
  })
}
