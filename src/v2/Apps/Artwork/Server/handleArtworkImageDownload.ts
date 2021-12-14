import "isomorphic-fetch"

export const handleArtworkImageDownload = async ({ req, res }) => {
  const { Artwork } = require("desktop/models/artwork")
  const artwork = new Artwork({ id: req.params.artworkID })
  await artwork.fetch({
    cache: true,
  })

  if (req.user && artwork.isDownloadable(req.user)) {
    const request = await fetch(artwork.downloadableUrl(req.user), {
      headers: {
        "X-ACCESS-TOKEN": req.user.get("accessToken"),
      },
    })

    res.redirect(302, request.url)
  }
}
