module.exports = """
  fragment artwork_metadata_stub on Artwork {
    ... artwork_metadata_stub_didactics
    ... artwork_metadata_stub_contact
  }
  #{require './queries/didactics2.coffee'}
  #{require './queries/contact2.coffee'}
"""
