#
# Serves client-side assets from Force, or from CDN
#

{ CDN_URL } = require '../../config'
fs = require 'fs'
path = require 'path'

manifestPath = path.join(__dirname, '..', '..', '..', 'public', 'assets', 'manifest.json')
AssetMap = if fs.existsSync(manifestPath) then require(manifestPath) else {}

module.exports = (req, res, next) ->
  res.locals.asset = (filename) ->
    # Trim '/assets/package.js' -> 'package.js'
    assetFile = filename.slice(8)

    # For CSS files, try to look up the corresponding JS file to see if its been fingerprinted
    if assetFile.endsWith('.css')
      jsFile = assetFile.replace('.css', '.js')

      # If the CSS file has been fingerprinted, return it, otherwise return the original CSS file.
      if (fingerprintedFile = AssetMap[jsFile])
        return fingerprintedFile.replace('.js', '.css')

      return filename

    # For JS file, if its been fingerprinted then return it, otherwise return the original JS file.
    if (fingerprintedFile = AssetMap[assetFile])
      return fingerprintedFile

    filename
  next()
