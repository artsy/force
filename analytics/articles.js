//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

if(location.pathname.match('/article/')){

  $(document.body).on('click', '.article-social > a', function() {
    analytics.track('Clicked Article Share', {
      context: 'bottom',
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

  //
  // Hooks
  //
  analyticsHooks.on('readmore', function() {
    analytics.track('Clicked Read More', {});
  });

  analyticsHooks.on('scrollarticle', function(options){
    analytics.page({path: location.pathname});
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

// Shared /article and /articles
if(location.pathname.match('/article/') || location.pathname.match('/articles')){

  analyticsHooks.on('submit:editorial-signup', function(options){
    analytics.track('Sign up for editorial email', {
      context: options.type
    });
  });

  analyticsHooks.on('dismiss:editorial-signup', function(){
    analytics.track('Dismiss editorial signup', { context: 'footer'});
  });

}

var visibleItems = function(articleTrackingItems) {

  var items = $(articleTrackingItems).filter(function() {
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    var itemTop = $(this).offset().top;
    var itemBottom = itemTop + $(this).outerHeight();

    // Either item top or item bottom is below the top
    // of the browser and above the fold.
    var topInView = itemTop > viewportTop && itemTop < viewportBottom;
    var bottomInView = itemBottom > viewportTop && itemBottom < viewportBottom;

    return topInView || bottomInView;
  }).map(function() {
    var classList = $(this).prop('classList');
    if(classList.contains('.article-es-cta')){
      return 'Email Signup'
    }
  }).toArray();

  // Don't double track the same impressions
  items = _.difference(items, trackedIds);
  trackedIds = trackedIds.concat(items);

  // Return only the new impressions
  return items.join();
};

var trackImpressions = function(articleTrackingItems) {
  var visibleItems = visibleItems(articleTrackingItems);
  if (visibleItems.length > 0) {
    visibleItems.map(function(item){

    }
    analytics.track(item.message, {
      ids: ids, nonInteraction: 1
    },{
      integrations: { 'Mixpanel': false }
    })
  }
};

// Find all of the signups, cta, share buttons, artist follow, toc, and image sets
var articleTrackingItems = $('.articles-es-cta')
trackImpressions(articleTrackingItems);
$(window).on('scroll', _.throttle(trackImpressions(articleTrackingItems), 200));
