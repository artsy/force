export const IGNORED_ERRORS = [
  "AbortError: Fetch is aborted",
  "AbortError: Request signal is aborted",
  "AbortError: The operation was aborted",
  'Blocked a frame with origin "https://www.artsy.net" from accessing a cross-origin frame',
  "cancelled",
  "Cannot set headers after they are sent to the client",
  "Failed to fetch",
  "Origin is not allowed by Access-Control-Allow-Origin",
  "pktAnnotationHighlighter", // Pocket ios app errors on opening articles
  "Request has been terminated Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin",
  "Request has been terminated Possible causes: the network is offline",
  "Response timeout",
  "SecurityError: Blocked a frame with origin", // Facebook scripts error on opening articles
  "TypeError Qg.m(gpt/pubads_impl_2021052601)",
  "undefined is not an object (evaluating 'g.toString')",
]

export const DENIED_URLS = [
  /t\.dca0\.com/i,
  /api\.sail-personalize\.com/i,
  /securepubads\.g\.doubleclick\.net/i,
]
