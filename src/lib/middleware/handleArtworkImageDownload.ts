import request from "superagent"

const { Artwork } = require("desktop/models/artwork")

export const handleArtworkImageDownload = async ({ req, res }) => {
  const artwork = new Artwork({ id: req.params.artworkID })
  await artwork.fetch({
    cache: true,
  })

  if (artwork.isDownloadable(req.user)) {
    const imageRequest = request.get(artwork.downloadableUrl(req.user))
    if (req.user) {
      imageRequest.set("X-ACCESS-TOKEN", req.user.get("accessToken"))
    }
    res.redirect(302, imageRequest.url)
  }
}
