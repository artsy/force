/*
 * Slinky.js v0.1.3
 * 
 * Copyright (c) 2015 Sorin Iclanzan
 * Licensed under the MIT license.
 */

(function ($, window, undefined) {
  'use strict';

  var pluginName = 'slinky';

  var slinky = $.fn[pluginName] = function (options) {
    options = $.extend({}, slinky.options, options);

    return this.each(function () {
      var $element = $(this);
      // Prevent multiple instantiations on the same element.
      if ($element.data(pluginName)) {
        return;
      }
      $element.data(pluginName, true);

      
      var $scroller = $element.children().first();
      var $sections, headers, scrollerHeight, timer;

      function refresh() {
        headers.forEach(function (header) {
          var position = '';
          var top = header.$parent.position().top;
          
          if (top <= header.top) {
            position = 'top';
          }
          else if (top + header.height >= scrollerHeight - header.bottom) {
            position = 'bottom';
          }

          // if ( header.$.position() <= ($(window).height() - 115)  {
          //   console.log('im hidden')
          // }


          if (position) {
            // Don’t do anything if the header is already positioned properly.
            if (header.position != position) {
              header.$parent
                .css('paddingTop', header.height);
              header.$
                .css('position', 'absolute')
                .css(position, header[position])
                .css(position == 'top' ? 'bottom' : 'top', '');
              header.position = position;
            }
          }
          else {
            header.$parent.css('paddingTop', '');
            header.$.css('position', '');
            header.position = '';
          }
        });
      }

      function init() {
        scrollerHeight = $scroller.outerHeight();
        headers = [];
        $sections = $scroller.children();
        $sections.each(function () {
          var $section = $(this);
          var $header = $section.children().first();
          headers.push({
            $: $header,
            $parent: $section,
            height: $header.outerHeight(),
            position: '' // can be 'top' or 'bottom'
          });
        });

        // Pre-calculate the offsets that the headers would have
        // from the top or bottom of the scroller.
        headers.forEach(function (header, i) {
          header.top = i > 0 ? (headers[i - 1].top + headers[i - 1].height) : 0;
          i = headers.length - i - 1;
          headers[i].bottom = i < headers.length - 1 ? (headers[i + 1].bottom + headers[i + 1].height) : 0;
        });

        refresh();
      }

      function enablePointerEvents() {
        $sections.css('pointer-events', '');
        timer = undefined;
      }

      init();

      $scroller

      .on('wheel.' + pluginName, function () {
        if (timer) {
          clearTimeout(timer);
        }
        else {
          $sections.css('pointer-events', 'none');
        }
        timer = setTimeout(enablePointerEvents, 100);
      })
      
      .on('scroll.' + pluginName, refresh);

      // On window resize we need to recalculate everything in case relative
      // units where used anywhere.
      $(window).on('resize.' + pluginName, init);

      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      if (MutationObserver) {
        var observer = new MutationObserver(init);
        observer.observe($scroller[0], {
          childList: true, characterData: true, subtree: true
        });
      }

      $element.on('remove.' + pluginName, function () {
        $scroller.off('wheel.' + pluginName + ' scroll.' + pluginName);
        $(window).off('resize.' + pluginName, init);
        if (observer) {
          observer.disconnect();
        }
      });
    });
  };
}(jQuery, window));
