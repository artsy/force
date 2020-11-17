if ("PerformanceLongTaskTiming" in window) {
  var g = (window.__tti = { e: [] })
  g.o = new PerformanceObserver(function(l) {
    g.e = g.e.concat(l.getEntries())
  })
  g.o.observe({ entryTypes: ["longtask"] })
}
