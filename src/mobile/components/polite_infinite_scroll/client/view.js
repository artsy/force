/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
//
// Polite Infinite Scroll View
//
// Generic view to be extended anywhere you need a collection view that
// starts infinite scrolling only after a "Show More" button is pressed
//
// This expects you to have an .is-show-more-button and a .loading-spinner
// outside and below your collection container.
//
// Don't forget to call super on your view's initialize!

let _PoliteInfiniteScrollView;
const Backbone = require('backbone');

export const PoliteInfiniteScrollView = (_PoliteInfiniteScrollView = class PoliteInfiniteScrollView extends Backbone.View {

  initialize(options){
    if (options) { ({ params: this.params } = options); }
    this.collection.on('sync', this.onSync);
    this.collection.fetch({
      data: this.params,
      success: () => this.onInitialFetch()
    });

    return this.$('.is-show-more-button').click(() => {
      return this.startInfiniteScroll();
    });
  }

  //
  // Called every time the collection is synced
  //
  onSync() {} // empty

  //
  // Called only when the collection is initially fetched
  //
  onInitialFetch() {
    this.showShowMoreButton();
    this.hideSpinner();
    return this.onSync();
  }

  //
  // Called when the end of the page is reached
  //
  onInfiniteScroll() {} // empty

  //
  // Called when the end of the collection is reached
  //
  onFinishedScrolling() {
    this.finishedScrolling = true;
    this.hideSpinner();
    return $('html').removeClass('infinite-scroll-is-active');
  }

  startInfiniteScroll() {
    this.hideShowMoreButton();
    this.showSpinner();
    $('html').addClass('infinite-scroll-is-active');
    return $.onInfiniteScroll(() => this.onInfiniteScroll());
  }

  showShowMoreButton() { return this.$('.is-show-more-button').removeClass('is-hidden'); }

  hideShowMoreButton() { return this.$('.is-show-more-button').addClass('is-hidden'); }

  showSpinner() { return this.$('.loading-spinner').show(); }

  hideSpinner() { return this.$('.loading-spinner').hide(); }
});
