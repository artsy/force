if (location.pathname.match('/2016-year-in-art')) {

  setTimeout(function () {
    analytics.track('time on page more than 30 seconds', { category: '30 Seconds', message: sd.CURRENT_PATH })
  }, 30000)

}
