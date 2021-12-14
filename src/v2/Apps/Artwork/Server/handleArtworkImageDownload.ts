export const handleArtworkImageDownload = async ({ req, res }) => {
  const { Artwork } = require("desktop/models/artwork")
  const artwork = new Artwork({ id: req.params.artworkID })
  await artwork.fetch({
    cache: true,
  })

  if (artwork.isDownloadable(req.user)) {
    const request = require("superagent")
    const imageRequest = request.get(artwork.downloadableUrl(req.user))
    if (req.user) {
      imageRequest.set("X-ACCESS-TOKEN", req.user.get("accessToken"))
    }
    res.redirect(302, imageRequest.url)
  }
}
