module.exports = """
  query AuctionRegistrationsQuery {
    me {
      sale_registrations: saleRegistrationsConnection(published: true, isAuction: true, sort: CREATED_AT_DESC, first: 10 ) {
        edges {
          node {
            is_registered: isRegistered
            sale {
              id: internalID
              name
              href
              start_at: startAt(format: "MMMM D, h:mmA")
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
    }
  }
"""
