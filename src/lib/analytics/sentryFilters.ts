export const IGNORED_ERRORS = [
  "AbortError: Failed to execute 'fetch' on 'Window': The user aborted a request.",
  "AbortError: Fetch is aborted",
  "AbortError: Request signal is aborted",
  "AbortError: The operation was aborted",
  "AbortError: The user aborted a request.",
  'Blocked a frame with origin "https://www.artsy.net" from accessing a cross-origin frame. Protocols, domains, and ports must match.',
  "cancelled",
  "Failed to fetch",
  "gpt/pubads_impl",
  "Illegal invocation", // From   "gpt/pubads_impl", script (3rd party)
  "Non-Error exception captured",
  "Non-Error promise rejection captured",
  "Origin is not allowed by Access-Control-Allow-Origin",
  "pktAnnotationHighlighter", // Pocket ios app errors on opening articles
  "Request has been terminated Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin",
  "Request has been terminated Possible causes: the network is offline",
  "Cannot set headers after they are sent to the client",
  "SecurityError: Blocked a frame with origin", // Facebook scripts error on opening articles
  "TypeError Qg.m(gpt/pubads_impl_2021052601)",
]

export const ALLOWED_URLS = [/(.*).?artsy.net/i, /(.*).?cloudfront.com/i]

export const DENIED_URLS = [
  /(.*).?braze.com/i,
  /(.*).?dca0.com/i,
  /(.*).?doubleclick.net/i,
  /(.*).?getletterpress.com/i,
  /(.*).?googletagservices.com/i,
  /(.*).?sail-personalize.com/i,
]
