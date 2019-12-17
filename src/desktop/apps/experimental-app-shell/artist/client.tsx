import { setupArtistSignUpModal } from "desktop/apps/artist/components/cta"
const mediator = require("desktop/lib/mediator.coffee")

export const client = () => {
  const pageType = window.location.pathname.split("/")[1]

  mediator.on("artist:tabclick", ({ to }) => {
    window.analytics.page(
      {
        path: to,
      },
      {
        integrations: {
          Marketo: false,
        },
      }
    )
  })

  if (pageType === "artist") {
    setupArtistSignUpModal()
  }
}
