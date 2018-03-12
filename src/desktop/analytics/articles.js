//
// Analytics for all things articles. This includes tests for share buttons
// and potentionally other alternative layout options or more.
//

if (location.pathname.match('/article/') || location.pathname.match('/2016-year-in-art')) {
  $(document.body).on('click', '.article-social a', function () {
    var articleId = $(this).closest('.article-container').data('id')
    analytics.track('Article Share', {
      article_id: articleId,
      context_type: sd.ARTICLE ? 'article_fixed' : 'magazine_fixed',
      service: $(this).attr('data-service')
    })
  }).on('click', '.article-share-fixed > a', function () {
    var articleId = $(this).closest('.article-container').data('id')
    analytics.track('Article Share', {
      article_id: articleId,
      context_type: 'article_sticky',
      service: $(this).attr('data-service')
    })
  }).on('click', '.article-sa-primary-logo a', function () {
    analytics.track('Clicked primary partner logo', {
      destination_path: $(this)[0].href,
      impression_type: 'sa_primary_logo',
      context_type: 'article_fixed'
    })
  }).on('click', '.article-sa-secondary-logo a', function () {
    analytics.track('Clicked secondary partner logo', {
      destination_path: $(this)[0].href,
      impression_type: 'sa_secondary_logo',
      context_type: 'article_fixed'
    })
  }).on('click', '.article-sa-cta-container a', function () {
    analytics.track('Clicked partner cta link', {
      destination_path: $(this)[0].href,
      impression_type: 'sa_partner_cta',
      context_type: 'article_fixed'
    })
  }).on('click', '.article-sa-footer-blurb a', function () {
    analytics.track('Clicked partner cta link in footer blurb', {
      destination_path: $(this)[0].href,
      impression_type: 'sa_partner_cta',
      context_type: 'article_fixed'
    })
  })

  // Hooks
  analyticsHooks.on('view:editorial-signup', function (options) {
    analytics.track('Article impression', {
      article_id: null,
      destination_path: null,
      impression_type: 'newsletter_signup',
      context_type: options.type
    })
  })
}

// Applies to both /article/* and /articles
if (location.pathname.match('/article/') || location.pathname.match('/articles') || location.pathname.match('/gallery-insights') || location.pathname.match('/venice-biennale-2015')) {
  $('.cta-bar .mktoButtonRow').click(function (e) {
    analytics.track('Sign up for gallery insights email', {
      session_id: sd.SESSION_ID,
      email: $('.cta-bar-container input').val(),
      article_id: $(this).closest('.article-container').data('id'),
      context_type: 'article_fixed'
    });
    analytics.identify({
      session_id: sd.SESSION_ID,
      email: $('.cta-bar-container input').val()
    });
  })

  $('#articles-body-container .mktoButtonRow').click(function (e) {
    var email = $("#Email").val();
    analytics.track('Sign up for gallery insights email', {
      session_id: sd.SESSION_ID,
      email: email,
      article_id: $(this).closest('.article-container').data('id'),
      context_type: 'article_fixed'
    });
    analytics.identify({
      session_id: sd.SESSION_ID,
      email: email
    });
  })

  analyticsHooks.on('submit:editorial-signup', function (options) {
    analytics.track('Sign up for editorial email', {
      article_id: $(this).closest('.article-container').data('id'),
      context_type: options.type,
      user_email: options.email
    })
  })

  analyticsHooks.on('dismiss:editorial-signup', function (options) {
    analytics.track('Dismiss editorial signup', {
      context_type: options.type
    })
  })
}
