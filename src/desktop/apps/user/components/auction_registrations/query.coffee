module.exports = """
  {
    me {
      sale_registrations(published: true, is_auction: true, sort: CREATED_AT_DESC) {
        is_registered
        sale {
          id
          name
          href
          start_at(format: "MMMM D, h:mmA")
          is_closed
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
