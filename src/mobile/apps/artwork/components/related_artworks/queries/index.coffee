module.exports = """
  _id
  id
  href
  title
  date
  sale_message
  is_inquireable
  images {
    versions
    url
    height
    width
    is_default
  }
  image {
    placeholder
    url (version: "tall")
    is_default
    thumb: resized(width: 350, version: ["large", "larger"]) {
      url
      height
    }
  }
  artist(shallow: true) {
    href
    name
  }
  collecting_institution
  partner(shallow: true) {
    href
    name
    type
  }
  is_buy_nowable
"""
