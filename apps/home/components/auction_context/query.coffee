module.exports = """
  fragment auction_context on HomePageModuleContextSale {
    href
    name
    description
    start_at(format: "MMM D")
    end_at
    live_start_at
    closes: end_at(format: "MMM D [at] ha", timezone: $timezone)
  }
"""
