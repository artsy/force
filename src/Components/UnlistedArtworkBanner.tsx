import { createFragmentContainer, graphql } from "react-relay"
import { Text, Clickable } from "@artsy/palette"
import { useState } from "react"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { UnlistedArtworkBanner_partner$data } from "/__generated__/UnlistedArtworkBanner_partner.graphql"
import { UnlistedBannerModal } from "Apps/Artwork/Components/UnlistedBannerModal"

interface UnlistedArtworkBannerProps {
  partner?: UnlistedArtworkBanner_partner$data
}

const UnlistedArtworkBanner: React.FC<UnlistedArtworkBannerProps> = ({
  partner,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <FullBleedBanner variant="brand">
        <Text data-testid="unlisted-text">
          This is a{" "}
          <Clickable
            textDecoration="underline"
            onClick={() => {
              setOpen(true)
            }}
          >
            private listing
          </Clickable>{" "}
          {partner?.name ? `from ${partner.name}.` : "."}
        </Text>
      </FullBleedBanner>
      <UnlistedBannerModal show={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const UnlistedArtworkBannerFragmentContainer = createFragmentContainer(
  UnlistedArtworkBanner,
  {
    partner: graphql`
      fragment UnlistedArtworkBanner_partner on Partner {
        name
      }
    `,
  }
)
