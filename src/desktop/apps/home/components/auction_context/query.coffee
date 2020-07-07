module.exports = """
  fragment auction_context on Sale {
    href
    name
    description
    start_at: startAt(format: "MMM D")
    end_at: endAt
    live_start_at: liveStartAt
    closes: endAt(format: "MMM D [at] ha", timezone: $timezone)
  }
"""
