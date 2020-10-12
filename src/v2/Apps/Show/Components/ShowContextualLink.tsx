import { Box, Link, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"
import { ShowContextualLink_show } from "v2/__generated__/ShowContextualLink_show.graphql"

interface Props {
  show: ShowContextualLink_show
}

export const ShowContextualLink: React.FC<Props> = ({ show }) => {
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

export const ContextualLink: React.FC<Props> = ({ show }) => {
  const { isFairBooth, partner, fair } = show

  if (!partner && !fair) return null

  const partnerHref = partner?.isLinkable && partner?.href
  const partnerName = partner?.name
  const fairName = fair?.name
  const fairHref = fair?.href

  const PartnerLink = (
    <Text variant="caption">
      Presented by&nbsp;
      {!!partnerHref ? (
        <Link href={partnerHref}>{partnerName}</Link>
      ) : (
        partnerName
      )}
    </Text>
  )

  const FairLink = (
    <Text variant="caption">
      Part of <Link href={fairHref}>{fairName}</Link>
    </Text>
  )

  return isFairBooth ? FairLink : !!partner && PartnerLink
}

export const ShowContextualLinkFragmentContainer = createFragmentContainer(
  ShowContextualLink,
  {
    show: graphql`
      fragment ShowContextualLink_show on Show {
        isFairBooth
        fair {
          href
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
