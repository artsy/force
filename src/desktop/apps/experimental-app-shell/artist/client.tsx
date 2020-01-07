import { setupArtistSignUpModal } from "desktop/apps/artist/components/cta"

export const client = () => {
  const pageType = window.location.pathname.split("/")[1]

  if (pageType === "artist") {
    setupArtistSignUpModal()
  }
}
