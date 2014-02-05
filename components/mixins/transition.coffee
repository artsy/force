module.exports =
  fade: ($el, options = {}) ->
    $el.
      attr('data-state', 'fade-out').
      one($.support.transition.end, ->
        options.out() if options.out?
        $el.
          attr('data-state', 'fade-in').
          one($.support.transition.end, ->
            options.in() if options.in?
          ).emulateTransitionEnd (options.duration or 250)
      ).emulateTransitionEnd (options.duration or 250)
