if (location.pathname.match('/article/') || location.pathname.match('/articles')) {
  var trackedImpressions = []

  var findVisibleItems = function (articleItems) {
    if (articleItems.length > 0) {
      var items = $(articleItems).filter(function () {
        var viewportTop = $(window).scrollTop()
        var viewportBottom = viewportTop + $(window).height()
        var itemTop = $(this).offset().top
        var itemBottom = itemTop + $(this).outerHeight()
        // Either item top or item bottom is below the top
        // of the browser and above the fold.
        var topInView = itemTop > viewportTop && itemTop < viewportBottom
        var bottomInView = itemBottom > viewportTop && itemBottom < viewportBottom

        return topInView || bottomInView
      }).map(function () {
        var classList = $(this).prop('classList')
        var articleId = $(this).closest('.article-container').data('id')
        // Editorial Signup
        if (classList.contains('articles-es-cta__form')) {
          if (location.pathname.match('/article/')) {
            return {
              impression_type: 'newsletter_signup',
              context_type: 'article_fixed',
              article_id: articleId,
              destination_path: null,
              id: 'article_fixed'
            }
          } else {
            return {
              impression_type: 'newsletter_signup',
              context_type: 'magazine_fixed',
              destination_path: null,
              id: 'magazine_fixed'
            }
          }
        } else if (classList.contains('article-es-form')) {
          if ($(this).parents('.is-expanded')) {
            return {
              impression_type: 'newsletter_signup',
              context_type: 'article_fixed',
              article_id: articleId,
              destination_path: null,
              id: 'article_fixed'
            }
          }

        // Social
        } else if (classList.contains('article-social')) {
          const article = $(this).closest('.article-content')
          if ((article.hasClass('gradient-blurb') && article.hasClass('is-expanded')) || !article.hasClass('gradient-blurb')) {
            return {
              article_id: articleId,
              destination_path: null,
              impression_type: 'social',
              context_type: 'article_fixed',
              id: 'social:' + articleId
            }
          }
        } else if (classList.contains('article-share-fixed-fullscreen')) {
          var indArticleId = $(this).data('id')
          return {
            article_id: articleId,
            destination_path: null,
            impression_type: 'social',
            context_type: 'article_fixed',
            id: 'social:' + indArticleId
          }

        // Image Set
        } else if (classList.contains('article-section-image-set')) {
          return {
            article_id: articleId,
            destination_path: null,
            impression_type: 'image_set',
            context_type: 'article_fixed',
            id: 'image_set:' + articleId + ':' + $(this).data('index')
          }

        // Related Article
        } else if (classList.contains('article-related-widget')) {
          var related = $(this).find('a')
          return {
            article_id: articleId,
            destination_path: null,
            impression_type: 'related_article',
            context_type: 'article_fixed',
            id: 'related_articles:' + trackRelatedLinks(related)
          }

        // Artist Follow
        } else if (classList.contains('artist-follow')) {
          const article = $(this).closest('.article-content')
          if ((article.hasClass('gradient-blurb') && article.hasClass('is-expanded')) || !article.hasClass('gradient-blurb')) {
            if ($(this).parent('.image-set-modal__container').length > 0) {
              return {
                article_id: articleId,
                destination_path: null,
                impression_type: 'artist_follow',
                context_type: 'article_fixed',
                context_module: 'article_image_set',
                id: 'artist_follow:' + 'image set' + ':' + $(this).data('id')
              }
            } else {
              return {
                article_id: articleId,
                destination_path: null,
                impression_type: 'artist_follow',
                context_type: 'article_fixed',
                context_module: 'article_artist_follow',
                id: 'artist_follow:' + articleId + ':' + $(this).data('id')
              }
            }
          }
        } else if (classList.contains('article-section-callout') && $(this)[0].href) {
          var destinationPath = $(this)[0].href.replace(/^.*\/\/[^\/]+/, '')
          return {
            article_id: articleId,
            destination_path: destinationPath,
            impression_type: 'article_callout',
            context_type: 'article_fixed',
            id: 'article_callout:' + articleId + ':' + destinationPath
          }
        } else {
          return
        }
      }).toArray()

      // Don't double track the same impressions
      items = _.filter(items, function (item) {
        return !(_.contains(trackedImpressions, item.id))
      })
      trackedImpressions = trackedImpressions.concat(_.pluck(items, 'id'))
      // Return only the new impressions
      return items
    } else {
      return []
    }
  }

  var trackImpressions = function () {
    var itemSelectors = '.articles-es-cta__form, .article-es-form,' +
                        '.article-social, .article-share-fixed-fullscreen,' +
                        '.article-section-image-set,' +
                        '.article-section-toc, .article-sa-sticky-header.visible,' +
                        '.article-sa-related,' +
                        '.artist-follow,' +
                        '.article-section-callout,' +
                        '.article-related-widget'

    var items = $(itemSelectors)
    var visibleItems = findVisibleItems(items)
    if (visibleItems.length > 0) {
      visibleItems.map(function (item) {
        trackImpression({ message: 'Article Impression', context: item })
      })
    }
  }
  var trackRelatedLinks = function (related) {
    var links = []
    related.map(function (i, link) {
      links.push(link.href.replace(/^.*\/\/[^\/]+/, ''))
    })
    return links
  }

  var trackImpression = function (item) {
    analytics.track(item.message, item.context)
  }

  $(window).on('scroll', _.throttle(trackImpressions, 500))

  analyticsHooks.on('view:image-set-item', function () {
    trackImpressions()
  })
}
