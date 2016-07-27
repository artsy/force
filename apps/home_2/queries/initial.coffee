module.exports = """
  query {
    home_page {
      artwork_modules(max_rails: 6) {
        key
        params {
          id
        }
      }
    }
  }
"""
