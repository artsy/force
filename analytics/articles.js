//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

analyticsHooks.on('article:fullyloaded', function() {
  analytics.page()
})

$('.articles-social:eq(0) > a').click(function() {
  analytics.track('Clicked Article Share', {
    position: 'top',
    service: $(this).attr('data-service')
  })
})

$('.articles-social:eq(1) > a').click(function() {
  analytics.track('Clicked Article Share', {
    position: 'bottom',
    service: $(this).attr('data-service')
  })
})