# This mess is probably going to get replaced with something like:
# http://ricostacruz.com/jquery.transit/
module.exports =
  fade: ($el, options) ->
    $el.
      attr('data-state', 'fade-out').
      one($.support.transition.end, ->
        options.out() if options?.out?
        $el.
          attr('data-state', 'fade-in').
          one($.support.transition.end, ->
            options.in() if options?.in?
          ).emulateTransitionEnd 250
      ).emulateTransitionEnd 250
