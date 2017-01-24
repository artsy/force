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
