import { Box, Link, Text, Separator } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"
import { ShowContextualLink_show } from "v2/__generated__/ShowContextualLink_show.graphql"
import styled from "styled-components"

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

  if (isFairBooth) {
    return (
      <>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        {fair.isActive && (
          <Box my={2}>
            <Text variant="caption">
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              Part of <Link href={fairHref}>{fairName}</Link>
            </Text>
            <FullScreenSeparator as="hr" my={2} />
          </Box>
        )}
      </>
    )
  }

  return (
    <Box my={2}>
      <Text variant="caption">
        Presented by&nbsp;
        {!!partnerHref ? (
          <Link href={partnerHref}>{partnerName}</Link>
        ) : (
          partnerName
        )}
      </Text>
      <FullScreenSeparator as="hr" my={2} />
    </Box>
  )
}

export const ShowContextualLinkFragmentContainer = createFragmentContainer(
  ShowContextualLink,
  {
    show: graphql`
      fragment ShowContextualLink_show on Show {
        isFairBooth
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

const FullScreenSeparator = styled(Separator)`
  left: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-width: 100vw;
  position: relative;
  right: 50%;
  width: 100vw;
`
