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
}
