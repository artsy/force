//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

if(location.pathname.match('/article/')){

  $(document.body).on('click', '.article-social a', function() {
    var articleId = $(this).closest('.article-container').data('id');
    analytics.track('Article Share', {
      article_id: articleId,
      context_type: sd.ARTICLE ? 'article_fixed' : 'magazine_fixed',
      service: $(this).attr('data-service')
    });

  }).on('click', '.article-share-fixed > a', function() {
    var articleId = $(this).closest('.article-container').data('id');
    analytics.track('Article Share', {
      article_id: articleId,
      context_type: 'article_sticky',
      service: $(this).attr('data-service')
    });

  }).on('click', '.article-section-toc-link a', function() {
    var articleId = $(this).closest('.article-container').data('id');
    analytics.track('Clicked article impression', {
      article_id: articleId,
      destination_path: null,
      impression_type: 'toc',
      context_type: 'article_fixed'
    });

  }).on('click', '.article-section-image-set', function() {
    var articleId = $(this).closest('.article-container').data('id');
    analytics.track('Clicked article impression', {
      article_id: articleId,
      destination_path: null,
      impression_type: 'image_set',
      context_type: 'article_fixed'
    });

  }).on('click', '.article-section-callout', function(){
    var articleId = $(this).closest('.article-container').data('id');
    // Only track callouts that are links
    if($(this)[0].href){
      analytics.track('Clicked article impression', {
        article_id: articleId,
        destination_path: $(this)[0].href.replace(/^.*\/\/[^\/]+/, ''),
        impression_type: 'article_callout',
        context_type: 'article_fixed'
      });
    }

  }).on('click', '.article-related-widget a', function(){
    var articleId = $(this).closest('.article-related-widget').data('id');
    analytics.track('Clicked article impression', {
      article_id: articleId,
      destination_path: $(this)[0].href.replace(/^.*\/\/[^\/]+/, ''),
      impression_type: 'article_related',
      context_type: 'article_fixed'
    });

  });

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
    analytics.track('Article impression', {
      article_id: null,
      destination_path: null,
      impression_type: 'newsletter_signup',
      context_type: 'article_popup'
    }, { integrations: { 'Mixpanel': false } } );
  });
}

// Applies to both /article/* and /articles
if(location.pathname.match('/article/') || location.pathname.match('/articles') || location.pathname.match('/gallery-insights')){

  analyticsHooks.on('submit:editorial-signup', function(options){
    analytics.track('Sign up for editorial email', {
      article_id: $(this).closest('.article-container').data('id'),
      context_type: options.type,
      user_email: options.email
    });
  });

  analyticsHooks.on('submit:gi-signup', function(options){
    analytics.track('Sign up for gallery insights email', {
      article_id: $(this).closest('.article-container').data('id'),
      context_type: 'article_fixed',
      user_email: options.email
    });
  });

  analyticsHooks.on('dismiss:editorial-signup', function(){
    analytics.track('Dismiss editorial signup', { context: 'article cta-popup'});
  });

}
