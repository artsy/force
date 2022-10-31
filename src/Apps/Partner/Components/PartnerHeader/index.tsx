import * as React from "react"
import styled from "styled-components"
import { Box, Text, Image, GridColumns, Column, Flex } from "@artsy/palette"
import { PartnerHeaderAddress } from "./PartnerHeaderAddress"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { ContextModule } from "@artsy/cohesion"
import { RouterLink } from "System/Router/RouterLink"
import { PartnerHeader_partner$data } from "__generated__/PartnerHeader_partner.graphql"
import { themeGet } from "@styled-system/theme-get"
import { Jump } from "Utils/Hooks/useJump"

export interface PartnerHeaderProps {
  partner: PartnerHeader_partner$data
}

// TODO: Replace with `Avatar`
export const HeaderImage = styled(Image)`
  border: 1px solid ${themeGet("colors.black10")};
  object-fit: contain;
`

export const PartnerHeader: React.FC<PartnerHeaderProps> = ({ partner }) => {
  const hasLocations = (partner.locations?.totalCount ?? 0) > 0
  // TODO: Remove after page migration.
  const partnerUrl = `/partner/${partner.slug}`
  const canFollow =
    partner && partner.type !== "Auction House" && !!partner.profile

  return (
    <>
      <Jump id="PartnerHeader" />

      <GridColumns gridRowGap={2} py={[2, 4]}>
        <Column span={[12, 10]}>
          <Flex>
            {partner.profile?.icon?.resized && (
              <Flex mr={2}>
                <RouterLink
                  to={partnerUrl}
                  display="flex"
                  textDecoration="none"
                >
                  <HeaderImage
                    src={partner.profile.icon.resized.src}
                    srcSet={partner.profile.icon.resized.srcSet}
                    alt={partner.name ?? ""}
                    width={[60, 80]}
                    height={[60, 80]}
                  />
                </RouterLink>
              </Flex>
            )}

            <Box>
              <Text as="h1" variant="xl">
                <RouterLink textDecoration="none" to={partnerUrl}>
                  {partner.name}
                </RouterLink>
              </Text>

              {hasLocations && (
                <Text color="black60" variant="sm">
                  {/* FIXME: Should be a fragment container */}
                  {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                  <PartnerHeaderAddress {...partner.locations} />
                </Text>
              )}
            </Box>
          </Flex>
        </Column>

        {canFollow && (
          <Column span={[12, 2]}>
            <FollowProfileButtonQueryRenderer
              id={partner.profile.internalID}
              contextModule={ContextModule.partnerHeader}
              width="100%"
            />
          </Column>
        )}
      </GridColumns>
    </>
  )
}

export const PartnerHeaderFragmentContainer = createFragmentContainer(
  PartnerHeader,
  {
    partner: graphql`
      fragment PartnerHeader_partner on Partner {
        name
        type
        slug
        profile {
          internalID
          icon {
            resized(width: 80, height: 80, version: "square140") {
              src
              srcSet
            }
          }
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
