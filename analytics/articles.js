//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

analyticsHooks.on('article:fullyloaded', function(articleId) {
  analytics.page('Article', 'Detail', { id: articleId })
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

$('.js--post-split-test').click(function(e) {
  e.preventDefault();
  analytics.track("Clicked posts link", {
    label: sd.POSTS_SECTION_NAME
  })
  location.assign($(e.target).attr('href'))
})

if (location.pathname.match('/articles')) {
  var start = Date.now();
  window.onbeforeunload = function(){
    analytics.track("Spent time on articles page" , {
      label: sd.POSTS_SECTION_NAME,
      timeOnPage: Date.now() - start
    })
  };
}