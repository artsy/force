module.exports = '''
  fragment images on Artwork {
    images {
      url(version: "larger")
      resized(width: 640, height: 640) {
        width
        height
      }
    }
  }
'''
