export const IGNORED_ERRORS = [
  "AbortError: Fetch is aborted",
  "AbortError: Request signal is aborted",
  "AbortError: The operation was aborted",
  'Blocked a frame with origin "https://www.artsy.net" from accessing a cross-origin frame. Protocols, domains, and ports must match.',
  "cancelled",
  "Failed to fetch",
  "Origin is not allowed by Access-Control-Allow-Origin",
  "pktAnnotationHighlighter", // Pocket ios app errors on opening articles
  "Request has been terminated Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin",
  "Request has been terminated Possible causes: the network is offline",
  "Response timeout",
  "SecurityError: Blocked a frame with origin", // Facebook scripts error on opening articles
  "TypeError Qg.m(gpt/pubads_impl_2021052601)",
]

export const DENIED_URLS = [
  /(.*).?dca0.com/i,
  /(.*).?sail-personalize.com/i,
  /(.*).?doubleclick.net/i,
  /(.*).?googletagservices.com/i,
  /(.*).?getletterpress.com/i,
  /(.*).?braze.com/i,
]
