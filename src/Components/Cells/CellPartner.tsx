import { Box, Image, ResponsiveBox, SkeletonBox, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { CellPartner_partner$data } from "__generated__/CellPartner_partner.graphql"
import { DEFAULT_CELL_WIDTH } from "./constants"
import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"

export interface CellPartnerProps extends Omit<RouterLinkProps, "to"> {
  partner: CellPartner_partner$data
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
}

const CellPartner: React.FC<CellPartnerProps> = ({
  partner,
  mode = "RAIL",
  ...rest
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH
  const image = partner.profile?.image?.cropped

  if (!partner.profile) {
    return null
  }

  return (
    <RouterLink
      to={partner.href}
      display="block"
      textDecoration="none"
      width={width}
      {...rest}
    >
      <EntityHeaderPartnerFragmentContainer
        partner={partner}
        displayAvatar={false}
        displayLink={false}
        alignItems="flex-end"
        mb={1}
      />

      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        {image?.src ? (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad
            style={{ display: "block" }}
          />
        ) : (
          <Text
            variant="lg-display"
            bg="black10"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {partner.initials}
          </Text>
        )}
      </ResponsiveBox>
    </RouterLink>
  )
}

type CellPartnerPlaceholderProps = Pick<CellPartnerProps, "mode">

export const CellPartnerPlaceholder: React.FC<CellPartnerPlaceholderProps> = ({
  mode = "RAIL",
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH

  return (
    <Box width={width}>
      <EntityHeaderPlaceholder displayAvatar={false} mb={1} />

      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        <SkeletonBox width="100%" height="100%" />
      </ResponsiveBox>
    </Box>
  )
}

export const CellPartnerFragmentContainer = createFragmentContainer(
  CellPartner,
  {
    partner: graphql`
      fragment CellPartner_partner on Partner {
        ...EntityHeaderPartner_partner
        internalID
        slug
        name
        href
        initials
        locationsConnection(first: 15) {
          edges {
            node {
              city
            }
          }
        }
        categories {
          name
          slug
        }
        profile {
          image {
            cropped(
              width: 445
              height: 334
              version: ["wide", "large", "featured", "larger"]
            ) {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
