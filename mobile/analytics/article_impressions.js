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

        // Editorial Signup
        if(classList.contains('articles-es-cta')){
          if(location.pathname.match('/article/')){
            return {
              impression_type: 'newsletter_signup',
              context_type: 'article_fixed',
              article_id: articleId,
              destination_path: null,
              id: 'article_fixed'
            }
          }else{
            return {
              impression_type: 'newsletter_signup',
              context_type: 'magazine_fixed',
              destination_path: null,
              id: 'magazine_fixed'
            }
          }

        // Image Set
        }else if(classList.contains('article-section-image-set')){
          return {
            article_id: articleId,
            destination_path: null,
            impression_type: 'image_set',
            context_type: 'article_fixed',
            id: 'image_set:' + articleId + ':' + $(this).data('index')
          }

        // TOC
        }else if(classList.contains('article-section-toc')){
          return {
            article_id: articleId,
            destination_path: null,
            impression_type: 'article_fixed',
            context_type: 'toc',
            id: 'toc:' + articleId
          }
        }else if(classList.contains('article-sa-related')){
          var articleId = $(this).closest('.article-container').data('id')
          return {
            article_id: articleId,
            destination_path: null,
            impression_type: 'article_fixed',
            context_type: 'toc',
            id: 'toc:' + articleId
          }

        // Artist Follow
        }else if(classList.contains('artist-follow')){
          return {
            article_id: articleId,
            destination_path: null,
            impression_type: 'artist_follow',
            context_type: 'article_fixed',
            context_module: 'article_artist_follow',
            id: 'artist_follow:' + articleId + ':' + $(this).data('id')
          }

        // Callout
        }else if(classList.contains('article-section-callout')){
          return {
            article_id: articleId,
            destination_path: $(this)[0].href.replace(/^.*\/\/[^\/]+/, ''),
            impression_type: 'article_callout',
            context_type: 'article_fixed',
            id: 'article_callout:' + articleId + ':' + $(this)[0].href.replace(/^.*\/\/[^\/]+/, '')
          }

        // Related Article
        }else if(classList.contains('article-footer-next')){
          var articleId = $(this).closest('.article-footer-container').siblings('.article-container').data('id')
          var related = $(this).find('.article-item-link')
          return {
            article_id: articleId,
            destination_path: null,
            impression_type: 'related_article',
            context_type: 'article_fixed',
            id: 'related_articles:' + trackRelatedIds(related)
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
    // Find signups, cta, share buttons, artist follow, and image sets
    var itemSelectors = '.articles-es-cta,' +
                        '.article-section-image-set,' +
                        '.article-section-toc,' +
                        '.article-sa-related,'+
                        '.artist-follow,'+
                        '.article-section-callout,'+
                        '.article-footer-next'

    var items = $(itemSelectors);

    var visibleItems = findVisibleItems(items);
    if (visibleItems.length > 0) {
      visibleItems.map(function(item){
        trackImpression({ message: 'Article Impression', context: item });
      });
    }
  }

  var trackRelatedIds = function(related) {
    var ids = [];
    related.map(function(i, link) {
      ids.push($(link).data('id'));
    });
    return ids;
  }

  var trackImpression = function(item) {
    analytics.track( item.message, item.context,
      { integrations: { 'Mixpanel': false } });
  }

  $(window).on('scroll', _.throttle(trackImpressions, 500));

  analyticsHooks.on('view:image-set-item', function() {
    trackImpressions();
  });

}
