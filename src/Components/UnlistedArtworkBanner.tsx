import { createFragmentContainer, graphql } from "react-relay"
import { Button, ModalDialog, Text, Clickable } from "@artsy/palette"
import { useState } from "react"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { UnlistedArtworkBanner_partner$data } from "/__generated__/UnlistedArtworkBanner_partner.graphql"

interface UnlistedArtworkBannerProps {
  partner: UnlistedArtworkBanner_partner$data
  show: boolean
  onClose(): void
}

const UnlistedArtworkBanner: React.FC<UnlistedArtworkBannerProps> = ({
  partner,
  show,
  onClose,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <FullBleedBanner variant="brand">
      {partner.name ? (
        <Text>
          This is a{" "}
          <Clickable
            textDecoration="underline"
            onClick={() => {
              setOpen(true)
            }}
          >
            private listing
          </Clickable>{" "}
          from {partner.name}
        </Text>
      ) : (
        "This is a private listing"
      )}
    </FullBleedBanner>
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
