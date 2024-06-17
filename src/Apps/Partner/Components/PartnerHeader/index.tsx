import * as React from "react"
import styled from "styled-components"
import {
  Box,
  Text,
  Image,
  GridColumns,
  Column,
  Flex,
  Stack,
} from "@artsy/palette"
import { PartnerHeaderAddress } from "./PartnerHeaderAddress"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { ContextModule } from "@artsy/cohesion"
import { RouterLink } from "System/Components/RouterLink"
import { PartnerHeader_partner$data } from "__generated__/PartnerHeader_partner.graphql"
import { themeGet } from "@styled-system/theme-get"
import { Jump } from "Utils/Hooks/useJump"
import { formatFollowerCount } from "Utils/formatFollowerCount"
import { FollowButtonInlineCount } from "Components/FollowButton/Button"
import { ProgressiveOnboardingFollowPartner } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowPartner"

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

  const hasFollows = partner.profile?.counts?.follows >= 500

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
            <FollowButtonContainer
              gap={0.5}
              flexDirection="row"
              alignItems="center"
              flexGrow={1}
            >
              <ProgressiveOnboardingFollowPartner>
                <FollowProfileButtonQueryRenderer
                  id={partner.profile.internalID}
                  contextModule={ContextModule.partnerHeader}
                  width="100%"
                />
              </ProgressiveOnboardingFollowPartner>

              {!!partner?.profile?.counts?.follows && (
                <FollowButtonInlineCount display={["block", "none"]}>
                  {hasFollows &&
                    formatFollowerCount(partner.profile.counts.follows)}
                </FollowButtonInlineCount>
              )}
            </FollowButtonContainer>

            {hasFollows && (
              <Text
                variant="xs"
                color="black60"
                textAlign="center"
                flexShrink={0}
                paddingTop={0.5}
                display={["none", "block"]}
              >
                {formatFollowerCount(partner?.profile?.counts?.follows)}{" "}
                Follower
                {partner?.profile?.counts?.follows === 1 ? "" : "s"}
              </Text>
            )}
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
          counts {
            follows
          }
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

const FollowButtonContainer = styled(Stack)`
  > div {
    width: 100%;
  }
`
