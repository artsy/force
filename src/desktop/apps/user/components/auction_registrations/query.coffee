module.exports = """
  query AuctionRegistrationsQuery {
    me {
      sale_registrations: saleRegistrations(published: true, isAuction: true, sort: CREATED_AT_DESC) {
        is_registered: isRegistered
        sale {
          id
          name
          href
          start_at: eventStartAt(format: "MMMM D, h:mmA")
          is_closed: isClosed
          profile {
            icon {
              url
            }
          }
        }
      }
    }
  }
"""
