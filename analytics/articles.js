//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

if(location.pathname.match('/article/')){

  $(document.body).on('click', '.article-social > a', function() {
    analytics.track('Clicked Article Share', {
      position: 'bottom',
      service: $(this).attr('data-service')
    })
  }).on('click', '.article-share-fixed > a', function() {
    analytics.track('Clicked Article Share', {
      position: 'fixed',
      service: $(this).attr('data-service')
    })
  }).on('click', '.article-related-widget a', function() {
    analytics.track('Clicked Related Article', {})
  }).on('click', '.article-section-toc-link a', function() {
    analytics.track('Clicked TOC Link', {})
  }).on('click', '.article-section-image-set', function() {
    analytics.track('Clicked Image Set', {})
  }).on('click', '.article-section-top-stories__item a', function() {
    analytics.track('Clicked Top Stories Link', {})
  })

  analyticsHooks.on('readmore', function() {
    analytics.track('Clicked Read More', {
      message: location.pathname
    });
  });

  analyticsHooks.on('scrollarticle', function(options){
    analytics.page({path: location.pathname});
    analytics.track('Article pageview', { message: location.pathname, nonInteraction: 1 });
    if(window.PARSELY){
      window.PARSELY.beacon.trackPageView({
        url: location.href,
        urlref: sd.APP_URL + '/' + options.urlref,
        js: 1,
        action_name: 'infinite'
      });
    }
  });

  analyticsHooks.on('submit:editorial-signup', function(options){
    analytics.track('Sign up for editorial email', {
      type: options.type
    });
  });

  analyticsHooks.on('dismiss:editorial-signup', function(){
    analytics.track('Dismiss editorial signup footer');
  });


}
