(function() {
  'use strict';

  var namespace, track, bind;

  namespace = function(name) {
    return 'inquiry_questionnaire:' + name;
  };

  track = function() {
    var args;
    args = arguments;
    args[0] = namespace(' ' + args[0]);
    analytics.track.apply(null, args);
  }

  bind = function(name, handler) {
    analyticsHooks.on(namespace(name), handler);
  };

  // DOM events
  var $document = $(document);

  $('.js-open-inquiry-flow').click(function() {
    track('Clicked link to open inquiry flow');
  });

  $document.on('click', '.js-choice', function() {
    var choice = $(this).data('value');
    track('Clicked on how_can_we_help option', {
      choice: choice
    });
  });

  $document.on('click', '.js-choice', function() {
    var choice = $(this).data('value');
    track('Clicked on how_can_we_help option', {
      choice: choice
    });
  });

  $document.on('click', '.js-nevermind', function() {
    track('Clicked on "Nevermind"');
  });

  $document.one('input', '.js-user-interests-search-input', function(e) {
    track('Started to type artist name in autocomplete field')
  });

  $document.on('click', '.js-login-email', function() {
    track('Clicked "Log in"');
  });

  $document.on('click', '.js-login-facebook', function() {
    track('Clicked "Log in with Facebook"');
  });

  $document.on('click', '.js-login-twitter', function() {
    track('Clicked "Log in with Twitter"');
  });

  $document.on('click', '.js-forgot-password', function() {
    track('Clicked "Forgot Password?"');
  });

  $document.on('click', '.js-send-inquiry', function() {
    track('Clicked "Send" on inquiry form');
  });

  $document.one('input', '.js-inquiry-message', function(e) {
    track('User changed inquiry message from default');
  });

  // Proxied events
  bind('modal:opened', function(context) {
    track('Opened inquiry flow');
  });

  bind('modal:closed', function(context) {
    track('Closed inquiry flow');
  });

  bind('state:completed', function(context) {
    track('Completed inquiry flow');
  });

  bind('state:aborted', function(context) {
    track('Aborted inquiry flow', {
      current: context.state.current()
    });
  });

  bind('state:next', function(context) {
    track('State changed to ' + context.state.current());
    track('State change', {
      current: context.state.current()
    });
  });

  bind('user:change:collector_level', function(context) {
    track('User set collector_level', {
      collector_level: context.user.get('collector_level')
    });
  });

  bind('user:sync', function(context) {
    track('User data saved');
  });

  bind('user_interests:add', function(context) {
    var userInterest = context.userInterests.first();
    track('User added an interest in artist', {
      artist_id: userInterest.related().interest.id
    })
  });

  bind('user_interests:remove', function(context) {
    track('User removed an interest in artist');
  });

  bind('inquiry:sync', function(context) {
    track('Inquiry successfully sent');
  });

  bind('inquiry:error', function(context) {
    track('Problem sending inquiry', context.inquiry.attributes);
  });
})();
