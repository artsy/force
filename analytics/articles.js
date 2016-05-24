//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

if(location.pathname.match('/article/')){

  $(document.body).on('click', '.article-social a', function() {
    analytics.track('Clicked Article Share', {
      context: 'bottom',
      service: $(this).attr('data-service')
    })
  }).on('click', '.article-share-fixed > a', function() {
    analytics.track('Clicked Article Share', {
      context: 'fixed',
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

  }).on('click', '.js-modalize-close', function() {
    analytics.track('Clicked Close Image Set', {})

  })

  // Hooks
  analyticsHooks.on('readmore', function(options) {
    analytics.track('Clicked Read More', {});
    analytics.page({path: location.pathname});
    if(window.PARSELY){
      window.PARSELY.beacon.trackPageView({
        url: location.href,
        urlref: sd.APP_URL + '/' + options.urlref,
        js: 1,
        action_name: 'infinite'
      });
    }
    if(window.Sailthru){
      Sailthru.track({
        domain: 'horizon.artsy.net',
        spider: true,
        track_url: true,
        url: sd.APP_URL + '/' + location.pathname,
        use_stored_tags: true
     });
    }
  });

  analyticsHooks.on('view:editorial-signup', function() {
    analytics.track('Article Impression',
      { context: 'article cta-popup' },
      { integrations: { 'Mixpanel': false } }
    );
  });
}

// Applies to both /article/* and /articles
if(location.pathname.match('/article/') || location.pathname.match('/articles')){

  analyticsHooks.on('submit:editorial-signup', function(options){
    analytics.track('Sign up for editorial email', {
      context: options.type
    });
  });

  analyticsHooks.on('dismiss:editorial-signup', function(){
    analytics.track('Dismiss editorial signup', { context: 'article cta-popup'});
  });

}
