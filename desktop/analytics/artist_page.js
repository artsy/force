if (location.pathname.match('/artist/.*') && sd.ARTIST) {
  $('#artist-nav-list a, .artist-tabs a').click(function (e) {
    const tab = $(e.target).text()
    analytics.track('Clicked artist page tab', { tab: tab })
  })

  $('.artist-image-module a').click(function (e) {
    analytics.track('Clicked artwork on artist page image module')
  })

  $('.artist-page-content .gradient-blurb-read-more').click(function (e) {
    analytics.track('Clicked to expand artist bio header')
  })

  analyticsHooks.on('artist_page:cta:shown', function () {
    analytics.track('Show artist page sign up prompt')
  })

  analyticsHooks.on('artist_page:cta:hidden', function () {
    analytics.track('Click', {
      context_module: 'artist page signup prompt',
      type: 'dismiss'
    })
  })
}
