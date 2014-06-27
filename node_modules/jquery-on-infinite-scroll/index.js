(function() {

  var onScroll = function() {
    if ($.active != 0) return;
    var offset = $(window).height() * 0.7,
      viewPortBottom = $(window).scrollTop() + $(window).height(),
      reachedBottom = viewPortBottom >= $(document).height() - offset;
    if (!reachedBottom) return;
    $(window).trigger('infiniteScroll');
  };

  $.onInfiniteScroll = function(callback) {
    $(window).on('infiniteScroll', callback);
    $(window).on('scroll', onScroll);
  };

})(jQuery);