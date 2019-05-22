/**
 * This file is required for mocha specific global test setup steps
 */
import "jsdom-global/register"

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    }
  }

window.alert = function(msg) {
  console.log(msg)
}

window.scrollTo = function() {}
