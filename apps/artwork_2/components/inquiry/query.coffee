module.exports = """
  fragment inquiry on Artwork {
    id
    is_contactable
    partner {
      name
      type
      is_pre_qualify
      contact_message
    }
    fair {
      id
      name
    }
  }
"""
