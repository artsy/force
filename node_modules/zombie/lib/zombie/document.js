var JSDOM, JSDOMSelectors, JSDOM_PATH, Path, applyDocumentFeatures, browserAugmentation, createDocument;

Path = require("path");

JSDOM_PATH = require.resolve("jsdom");

applyDocumentFeatures = require("" + JSDOM_PATH + "/../jsdom/browser/documentfeatures").applyDocumentFeatures;

browserAugmentation = require("" + JSDOM_PATH + "/../jsdom/browser/index").browserAugmentation;

JSDOM = require("jsdom");

JSDOMSelectors = require("" + JSDOM_PATH + "/../jsdom/selectors/index");

module.exports = createDocument = function(browser, window, referer) {
  var document, features, jsdomBrowser;
  features = {
    MutationEvents: "2.0",
    ProcessExternalResources: [],
    FetchExternalResources: [],
    QuerySelector: true
  };
  jsdomBrowser = browserAugmentation(JSDOM.defaultLevel, {
    parser: browser.htmlParser
  });
  document = new jsdomBrowser.HTMLDocument({
    referrer: referer
  });
  JSDOMSelectors.applyQuerySelectorPrototype(JSDOM.defaultLevel);
  if (browser.hasFeature("scripts", true)) {
    features.FetchExternalResources.push("script");
    features.ProcessExternalResources.push("script");
  }
  if (browser.hasFeature("css", false)) {
    features.FetchExternalResources.push("css");
    features.FetchExternalResources.push("link");
  }
  if (browser.hasFeature("img", false)) {
    features.FetchExternalResources.push("img");
  }
  if (browser.hasFeature("iframe", true)) {
    features.FetchExternalResources.push("iframe");
  }
  applyDocumentFeatures(document, features);
  Object.defineProperty(document, "window", {
    value: window
  });
  Object.defineProperty(document, "parentWindow", {
    value: window.parent
  });
  Object.defineProperty(document, "location", {
    get: function() {
      return window.location;
    },
    set: function(url) {
      return window.location = url;
    }
  });
  Object.defineProperty(document, "URL", {
    get: function() {
      return window.location.href;
    }
  });
  return document;
};
