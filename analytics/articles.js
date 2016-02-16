//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

if(location.pathname.match('/article/')){

  $(document.body).on('click', '.article-social.article-share-top > a', function() {
    analytics.track('Clicked Article Share', {
      position: 'top',
      service: $(this).attr('data-service')
    })
  })

  $(document.body).on('click', '.article-social.article-share-bottom > a', function() {
    analytics.track('Clicked Article Share', {
      position: 'bottom',
      service: $(this).attr('data-service')
    })
  })

  $(document.body).on('click', '.article-share-fixed > a', function() {
    analytics.track('Clicked Article Share', {
      position: 'fixed',
      service: $(this).attr('data-service')
    })
  })

  $(document.body).on('click', '.article-related-widget a', function() {
    analytics.track('Clicked Related Article', {})
  })

  analyticsHooks.on('readmore', function() {
    analytics.track('Clicked Read More', {
      message: location.pathname
    });
  });

  analyticsHooks.on('scrollarticle', function(options){
    analytics.page({path: location.pathname});
    analytics.track('Article pageview', { message: location.pathname });
    if(window.PARSELY){
      window.PARSELY.beacon.trackPageView({
        url: location.href,
        urlref: sd.APP_URL + '/' + options.urlref,
        js: 1,
        action_name: 'infinite'
      });
    }
  });
}
