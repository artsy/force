//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

$('.article-social:eq(0) > a').click(function() {
  analytics.track('Clicked Article Share', {
    position: 'top',
    service: $(this).attr('data-service')
  })
})

$('.article-social:eq(1) > a').click(function() {
  analytics.track('Clicked Article Share', {
    position: 'bottom',
    service: $(this).attr('data-service')
  })
})

if (location.pathname.match('/articles')) {
  var start = Date.now();
  window.onbeforeunload = function(){
    analytics.track("Spent time on articles page" , {
      label: "News",
      timeOnPage: Date.now() - start
    })
  };
}