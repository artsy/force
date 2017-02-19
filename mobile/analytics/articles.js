//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

if(location.pathname.match('/article/')){

  $(document.body).on('click', '.js--article-fixed-share a', function() {
    var articleId = $(this).closest('.article-container').data('id');
    analytics.track('Article Share', {
      article_id: articleId,
      context_type: sd.ARTICLE ? 'article_fixed' : 'magazine_fixed',
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
    analytics.track('Clicked article impression', {
      article_id: articleId,
      destination_path: $(this)[0].href.replace(/^.*\/\/[^\/]+/, ''),
      impression_type: 'article_callout',
      context_type: 'article_fixed'
    });

  }).on('click', '.article-footer-next a', function(){
    var articleId = $(this).closest('.article-container').data('id');
    analytics.track('Clicked article impression', {
      article_id: articleId,
      destination_path: $(this)[0].href.replace(/^.*\/\/[^\/]+/, ''),
      impression_type: 'related_article',
      context_type: 'article_fixed'
    });

  });

  analyticsHooks.on('readmore', function(options) {
    analytics.track('Clicked Read More', {});
    analytics.page({path: location.pathname});
    if(window.PARSELY){
      window.PARSELY.beacon.trackPageView({
        url: sd.ARTSY_URL + location.pathname,
        urlref: sd.ARTSY_URL + '/article/' + options.urlref,
        js: 1,
        action_name: 'infinite'
      });
    }
    if(window.Sailthru){
      Sailthru.track({
        domain: 'horizon.artsy.net',
        spider: true,
        track_url: true,
        url: sd.ARTSY_URL + '/' + location.pathname,
        use_stored_tags: true
     });
    }
  });

  analyticsHooks.on('submit:editorial-signup', function(options){
    analytics.track('Sign up for editorial email', {
      article_id: $(this).closest('.article-container').data('id'),
      context_type: options.type,
      user_email: options.email
    });
  });

  analyticsHooks.on('impression:editorial-signup', function(options){
    analytics.track('Article Impression', {
        article_id: options.article_id,
        context_type: options.type,
        impression_type: 'newsletter_signup',
        user_email: options.email
    });
  });

  analyticsHooks.on('click:editorial-signup', function(options){
    analytics.track('Clicked article impression', {
      article_id: $(this).closest('.article-container').data('id'),
      context_type: options.type,
      impression_type: 'newsletter_signup',
      destination_path: null
    });
  });

  analyticsHooks.on('closed:image-set', function(){
    analytics.track('Clicked Close Image Set', {})
  });
}
