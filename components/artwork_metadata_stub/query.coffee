module.exports = """
  fragment artwork_metadata_stub on Artwork {
    ... artwork_metadata_stub_didactics
    ... artwork_metadata_stub_contact
  }
  #{require './queries/didactics.coffee'}
  #{require './queries/contact.coffee'}
"""
