/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _DeepZoomView;
const _ = require('underscore');
const Backbone = require('backbone');
const { SEADRAGON_URL }  = require('sharify').data;
const template = function() { return require('./template.jade')(...arguments); };

const getScript = function(src, callback) {
  const script = document.createElement('script');
  script.async = 'async';
  script.src = src;
  if (callback) { script.onload = callback; }
  return document.getElementsByTagName('head')[0].appendChild(script);
};

export const DeepZoomView = (_DeepZoomView = (function() {
  _DeepZoomView = class DeepZoomView extends Backbone.View {
    static initClass() {
      this.prototype.id = 'deep-zoom';
  
      this.prototype.events =
        {'click #dz-close': 'close'};
    }

    render() {
      let imageOptions;
      if (this.model.defaultImage().canDeepZoom()) {
        imageOptions = this.model.defaultImage().deepZoomJson();
      } else if (this.model.defaultImage().has('deep_zoom')) {
        imageOptions = {Image: this.model.defaultImage().get('deep_zoom').Image};
      } else {
        return;
      }
      this.$el.html(template);

      // Currently using a *very edge* build of OpenSeadragon ganked from
      // https://github.com/openseadragon/openseadragon/pull/369
      // that includes substantially improved touch gesture support.
      //
      // Periodically check in on this to see when it was merged
      // and update the vendored build.
      getScript(SEADRAGON_URL, () => {
        this.viewer = OpenSeadragon({
          id: this.id,
          debugMode: false,
          showNavigationControl: false,
          immediateRender: false,
          useCanvas: true,
          constrainDuringPan: false,
          blendTime: 0.0,
          animationTime: 1.2,
          springStiffness: 14.0,
          maxZoomPixelRatio: 1.0,
          minZoomImageRatio: 0.9,
          zoomPerClick: 1.4,
          zoomPerScroll: 1.4,
          clickDistThreshold: 5,
          clickTimeThreshold: 300,
          visibilityRatio: 0.9,
          tileSources: imageOptions,
          error: this.close,
          gestureSettingsTouch  : {
            scrollToZoom: false,
            clickToZoom: true,
            pinchToZoom: true,
            flickEnabled: true,
            flickMinSpeed: 20,
            flickMomentum: 0.40
          }
        });

        return this.postRender();
      });

      return this;
    }

    postRender() {
      return this.viewer.addHandler('tile-drawn', _.once(() => {
        return this.$('.loading-spinner').remove();
      })
      );
    }

    close(e) {
      if (this.viewer != null) {
        this.viewer.destroy();
      }
      this.remove();
      return false;
    }
  };
  _DeepZoomView.initClass();
  return _DeepZoomView;
})());
