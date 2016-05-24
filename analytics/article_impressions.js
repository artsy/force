if(location.pathname.match('/article/') || location.pathname.match('/articles')){

  var trackedImpressions = [];

  var findVisibleItems = function(articleItems) {

    if (articleItems.length > 0) {
      var items = $(articleItems).filter(function() {
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
        var articleId = $(this).closest('.article-container').data('id');
        if(classList.contains('articles-es-cta')){
          if(location.pathname.match('/article/')){
            return { context: 'article lush', id: 'article lush' }
          }else{
            return { context: 'magazine lush', id: 'magazine lush' }
          }

        }else if(classList.contains('article-social')){
          return { context: 'share bottom', id: 'share bottom:'+ articleId }

        }else if(classList.contains('article-section-image-set')){
          return { context: 'image set', id: 'image set:' + articleId + ':' + $(this).data('index') }

        }else if(classList.contains('article-section-toc')){
          return { context: 'toc', id: 'toc:' + articleId }

        }else if(classList.contains('artist-follow')){
          if($(this).parent('.image-set-modal__container').length > 0){
            return { context: 'artist follow image set', id: 'artist follow:' + 'image set' + ':' + $(this).data('id') }
          }else{
            return { context: 'artist follow page', id: 'artist follow:' + articleId + ':' + $(this).data('id') }
          }
        }else{
          return {}
        }
      }).toArray();

      // Don't double track the same impressions
      items = _.filter(items, function(item){
        return !(_.contains(trackedImpressions, item.id))
      })
      trackedImpressions = trackedImpressions.concat(_.pluck(items, 'id'));
      // Return only the new impressions
      return items;
    }else{
      return [];
    }
  };

  var trackImpressions = function() {
    // Find signups, cta, share buttons, artist follow, toc, and image sets
    var items = $('.articles-es-cta, .article-social, .article-section-image-set, .article-section-toc, .artist-follow');

    var visibleItems = findVisibleItems(items);
    if (visibleItems.length > 0) {
      visibleItems.map(function(item){
        trackImpression({ message: 'Article Impression', context: item.context });
      });
    }
  }

  var trackImpression = function(item) {
    analytics.track( item.message, { context: item.context },
      { integrations: { 'Mixpanel': false } });
  }

  $(window).on('scroll', _.throttle(trackImpressions, 500));

  analyticsHooks.on('view:image-set-item', function() {
    trackImpressions();
  });

}
