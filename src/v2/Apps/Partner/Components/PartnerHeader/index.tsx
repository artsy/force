import React from "react"
import styled from "styled-components"
import {
  Box,
  Text,
  Image,
  color,
  GridColumns,
  Column,
  Flex,
} from "@artsy/palette"
import { PartnerHeaderAddress } from "./PartnerHeaderAddress"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowProfileButtonFragmentContainer as FollowProfileButton } from "v2/Components/FollowButton/FollowProfileButton"
import { useSystemContext } from "v2/Artsy"
import { ContextModule } from "@artsy/cohesion"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { PartnerHeader_partner } from "v2/__generated__/PartnerHeader_partner.graphql"

export interface PartnerHeaderProps {
  partner: PartnerHeader_partner
}

export const HeaderImage = styled(Image)`
  border: 1px solid ${color("black10")};
`

export const PartnerHeader: React.FC<PartnerHeaderProps> = ({ partner }) => {
  const { user } = useSystemContext()
  const hasLocations = partner.locations?.totalCount > 0
  // TODO: Remove after page migration.
  const partnerUrl = `/partner2${partner.href}`
  const canFollow =
    partner && partner.type !== "Auction House" && !!partner.profile

  return (
    <GridColumns gridRowGap={2} my={[2, 4]}>
      <Column span={[12, 10]}>
        <Flex>
          {partner.profile?.icon && (
            <Flex mr={2}>
              <RouterLink
                to={partnerUrl}
                style={{ display: "flex", textDecoration: "none" }}
              >
                <HeaderImage
                  src={partner.profile.icon.cropped.src}
                  srcSet={partner.profile.icon.cropped.srcSet}
                  alt={partner.name}
                  width={[60, 80]}
                  height={[60, 80]}
                />
              </RouterLink>
            </Flex>
          )}
          <Box>
            <Text variant="largeTitle">
              <RouterLink
                style={{
                  textDecoration: "none",
                }}
                to={partnerUrl}
              >
                {partner.name}
              </RouterLink>
            </Text>
            {hasLocations && (
              <Text color={color("black60")} variant="text">
                <PartnerHeaderAddress {...partner.locations} />
              </Text>
            )}
          </Box>
        </Flex>
      </Column>
      <Column span={[12, 2]}>
        {canFollow && (
          <FollowProfileButton
            profile={partner.profile}
            user={user}
            contextModule={ContextModule.partnerHeader}
            buttonProps={{
              variant: "secondaryOutline",
              width: "100%",
            }}
          />
        )}
      </Column>
    </GridColumns>
  )
}

export const PartnerHeaderFragmentContainer = createFragmentContainer(
  PartnerHeader,
  {
    partner: graphql`
      fragment PartnerHeader_partner on Partner {
        name
        type
        href
        profile {
          icon {
            cropped(width: 80, height: 80, version: "square140") {
              src
              srcSet
            }
          }
          ...FollowProfileButton_profile
        }
        locations: locationsConnection(first: 20) {
          totalCount
          edges {
            node {
              city
            }
          }
        }
      }
    `,
  }
)
