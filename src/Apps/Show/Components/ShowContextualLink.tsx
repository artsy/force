import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { Box, Text } from "@artsy/palette"
import type { ShowContextualLink_show$data } from "__generated__/ShowContextualLink_show.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  show: ShowContextualLink_show$data
}

export const ShowContextualLink: React.FC<React.PropsWithChildren<Props>> = ({
  show,
}) => {
  return (
    <>
      <Media at="xs">
        <Box style={{ textAlign: "center" }}>
          <ContextualLink show={show} />
        </Box>
      </Media>
      <Media greaterThan="xs">
        <ContextualLink show={show} />
      </Media>
    </>
  )
}

export const ContextualLink: React.FC<React.PropsWithChildren<Props>> = ({
  show,
}) => {
  const { isFairBooth, partner, fair, hasLocation } = show

  if (!partner && !fair) return null

  const partnerHref = partner?.isLinkable && partner?.href
  const partnerName = partner?.name
  const shouldShowLocation =
    hasLocation && !isFairBooth && show.location?.display
  const fairName = fair?.name
  const fairHref = fair?.href || ""

  if (isFairBooth) {
    return (
      <>
        {fair?.isActive && (
          <Box>
            <Text variant="sm">
              Part of{" "}
              <RouterLink inline to={fairHref}>
                {fairName}
              </RouterLink>
            </Text>
          </Box>
        )}
      </>
    )
  }

  return (
    <Box>
      <Text variant="sm" textAlign="left">
        Presented by&nbsp;
        {!!partnerHref ? (
          <RouterLink inline to={partnerHref}>
            {partnerName}
          </RouterLink>
        ) : (
          partnerName
        )}
      </Text>
      {shouldShowLocation && (
        <Text variant="sm" color="mono60">
          {show.location?.display}
        </Text>
      )}
    </Box>
  )
}

export const ShowContextualLinkFragmentContainer = createFragmentContainer(
  ShowContextualLink,
  {
    show: graphql`
      fragment ShowContextualLink_show on Show {
        isFairBooth
        hasLocation
        location {
          display
        }
        fair {
          href
          isActive
          name
        }
        partner {
          ... on Partner {
            isLinkable
            name
            href
          }
        }
      }
    `,
  }
)
