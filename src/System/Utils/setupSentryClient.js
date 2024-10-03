"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.setupSentryRouterTracing = exports.setupSentryClient = exports.sentryRouterTracing = void 0;
var browser_1 = require("@sentry/browser");
var sentryFilters_1 = require("Server/analytics/sentryFilters");
var getENV_1 = require("Utils/getENV");
var initialPageLoadSpan;
function setupSentryClient() {
    if ((0, getENV_1.getENV)("NODE_ENV") !== "production") {
        return;
    }
    var sentryClient = (0, browser_1.init)({
        allowUrls: sentryFilters_1.ALLOWED_URLS,
        denyUrls: sentryFilters_1.DENIED_URLS,
        dsn: (0, getENV_1.getENV)("SENTRY_PUBLIC_DSN"),
        ignoreErrors: sentryFilters_1.IGNORED_ERRORS,
        tracesSampleRate: 1.0,
        integrations: [
            (0, browser_1.browserTracingIntegration)({
                // See sentry router tracing below
                instrumentNavigation: false,
                instrumentPageLoad: false
            }),
            (0, browser_1.dedupeIntegration)(),
        ]
    });
    // Init router tracing and set initial page load span
    exports.sentryRouterTracing = (0, exports.setupSentryRouterTracing)(sentryClient);
    initialPageLoadSpan = exports.sentryRouterTracing === null || exports.sentryRouterTracing === void 0 ? void 0 : exports.sentryRouterTracing.initialPageloadStart();
}
exports.setupSentryClient = setupSentryClient;
var setupSentryRouterTracing = function (sentryClient) {
    return {
        initialPageloadStart: function () {
            var _a;
            return (0, browser_1.startBrowserTracingPageLoadSpan)(sentryClient, {
                name: window.location.pathname,
                attributes: (_a = {},
                    _a[browser_1.SEMANTIC_ATTRIBUTE_SENTRY_OP] = "pageload",
                    _a[browser_1.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN] = "auto.pageload.react.client_router",
                    _a[browser_1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = "url",
                    _a)
            });
        },
        initialPageloadComplete: function (match) {
            if (initialPageLoadSpan) {
                initialPageLoadSpan.updateName(match.location.pathname);
                initialPageLoadSpan.setAttribute(browser_1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "route");
                initialPageLoadSpan = null;
                return;
            }
        },
        navigation: function (match) {
            var _a;
            exports.sentryRouterTracing === null || exports.sentryRouterTracing === void 0 ? void 0 : exports.sentryRouterTracing.initialPageloadComplete(match);
            (0, browser_1.startBrowserTracingNavigationSpan)(sentryClient, {
                op: "navigation",
                name: match.location.pathname,
                attributes: __assign((_a = {}, _a[browser_1.SEMANTIC_ATTRIBUTE_SENTRY_OP] = "navigation", _a[browser_1.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN] = "auto.navigation.react.client_router", _a[browser_1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = "route", _a), routeMatchToParamSpanAttributes(match.params))
            });
        }
    };
};
exports.setupSentryRouterTracing = setupSentryRouterTracing;
function routeMatchToParamSpanAttributes(params) {
    if (!params) {
        return {};
    }
    var paramAttributes = {};
    Object.entries(params).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        paramAttributes["url.path.params.".concat(key)] = value;
    });
    return paramAttributes;
}
