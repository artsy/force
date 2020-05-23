import { Box } from "@artsy/palette"
import { SystemContextProvider } from "v2/Artsy/SystemContext"
import { MockRouter } from "v2/DevTools"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { routes as artworkRoutes } from "../Artwork/routes"

storiesOf("Apps/Artwork", module)
  .add("Default", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/andy-warhol-skull"
      />
    )
  })
  .add("Confirm Bid", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/yoshitomo-nara-untitled-65/confirm-bid"
      />
    )
  })
  .add("Inquireable", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/jerry-freedner-approaching-storm"
      />
    )
  })
  .add("Hidden availability/one edition", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/5bfd71bd385402192a4750d4"
      />
    )
  })
  .add("Open Auction", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/jeanine-coupe-ryding-ennui"
      />
    )
  })
  .add("Closed Auction", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/victor-vasarely-folkokta-4"
      />
    )
  })
  .add("Fair", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/donald-martiny-milyan"
      />
    )
  })
  .add("Partner Show (Gallery)", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/victor-vasarely-darac-ii"
      />
    )
  })
  .add("Cultural Maker Artwork", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/american-18th-century-lady-wearing-a-large-white-cap"
      />
    )
  })
  .add("Tall image", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/nissa-kauppila-wu-ti-35-degrees-45-35-dot-5-n-81-degrees-21-16-dot-2-w"
      />
    )
  })
  .add("Wide image", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/josef-albers-interlinear-n-65"
      />
    )
  })
  .add("Related Grids (but no content)", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/robert-rauschenberg-and-susan-weil-female-figure"
      />
    )
  })
  .add("Artwork with multiple artists", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/andy-warhol-twenty-years-1977-signed-slash-inscribed-by-leo-exhibition-catalogue-leo-castelli-gallery-1st-edition"
      />
    )
  })
  .add("Artwork with multiple images", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/kees-van-dongen-femme-allongee"
      />
    )
  })
  .add("Artwork in an auction", () => {
    return (
      <SystemContextProvider>
        <Box>
          <MockRouter
            routes={artworkRoutes}
            initialRoute="/artwork/pablo-picasso-la-minotauromachie"
            context={{
              mediator: {
                trigger: x => x,
              },
            }}
          />
        </Box>
      </SystemContextProvider>
    )
  })
  .add("Artwork in a benefit buy now auction", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/annie-lennox-now-dot-dot-dot"
      />
    )
  })
  .add("Artwork with Price in Context", () => {
    return (
      <MockRouter
        routes={artworkRoutes}
        initialRoute="/artwork/andy-warhol-marilyn-orange-lg"
      />
    )
  })
