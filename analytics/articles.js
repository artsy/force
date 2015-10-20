//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

$('.article-social:eq(0) > a').click(function() {
  analytics.track('Clicked Article Share', {
    position: 'top',
    service: $(this).attr('data-service'),
    scroll: sd.SCROLL_ARTICLE,
    share: sd.SHARE_ARTICLE
  })
})

$('.article-social:eq(1) > a').click(function() {
  analytics.track('Clicked Article Share', {
    position: 'bottom',
    service: $(this).attr('data-service'),
    scroll: sd.SCROLL_ARTICLE,
    share: sd.SHARE_ARTICLE
  })
})

$('.article-share-fixed > a').click(function() {
  analytics.track('Clicked Article Share', {
    position: 'fixed',
    service: $(this).attr('data-service'),
    scroll: sd.SCROLL_ARTICLE,
    share: sd.SHARE_ARTICLE
  })
})

$('.article-related-widget a').click(function() {
  analytics.track('Clicked Related Article', {
    scroll: sd.SCROLL_ARTICLE,
    share: sd.SHARE_ARTICLE
  })
})

$('.article-container .gradient-blurb-read-more').click(function() {
  analytics.track('Clicked Read More', {
    scroll: sd.SCROLL_ARTICLE,
    share: sd.SHARE_ARTICLE
  })
})
