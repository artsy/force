import { storiesOf } from "@storybook/react"
import { SystemContextProvider } from "v2/Artsy"
import { StandardArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { StyledText } from "v2/Components/Publishing/Sections/StyledText"
import { LinkWithTooltip } from "v2/Components/Publishing/ToolTip/LinkWithTooltip"
import { TooltipsData } from "v2/Components/Publishing/ToolTip/TooltipsDataLoader"
import React from "react"

const tracking = { trackEvent: x => x, getTrackingData: x => x } as any

storiesOf("Publishing/ToolTips", module)
  .add("Artist", () => {
    return (
      <div style={{ maxWidth: 580, margin: "50px auto 0 auto" }}>
        <SystemContextProvider>
          <TooltipsData article={StandardArticle}>
            <StyledText layout="standard">
              <LinkWithTooltip
                url="https://artsy.net/artist/fra-angelico"
                tracking={tracking}
              >
                Fra Angelico
              </LinkWithTooltip>
              {`, `}
              <LinkWithTooltip
                url="https://artsy.net/artist/judy-chicago"
                tracking={tracking}
              >
                Judy Chicago
              </LinkWithTooltip>
              {`, and `}
              <LinkWithTooltip
                url="https://artsy.net/artist/alfred-stieglitz"
                tracking={tracking}
              >
                Alfred Stieglitz
              </LinkWithTooltip>
            </StyledText>
          </TooltipsData>
        </SystemContextProvider>
      </div>
    )
  })
  .add("Gene", () => {
    return (
      <div style={{ maxWidth: 580, margin: "50px auto" }}>
        <SystemContextProvider>
          <TooltipsData article={StandardArticle}>
            <StyledText layout="standard">
              <LinkWithTooltip
                url="https://artsy.net/gene/art-nouveau"
                tracking={tracking}
              >
                Art Nouveau
              </LinkWithTooltip>
              {` and `}
              <LinkWithTooltip
                url="https://artsy.net/gene/art-deco"
                tracking={tracking}
              >
                Art Deco
              </LinkWithTooltip>
            </StyledText>
          </TooltipsData>
        </SystemContextProvider>
      </div>
    )
  })
