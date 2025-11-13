import { FollowButtonInlineCount } from "Components/FollowButton/Button"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { ProgressiveOnboardingFollowPartner } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowPartner"
import { RouterLink } from "System/Components/RouterLink"
import { formatFollowerCount } from "Utils/formatFollowerCount"
import { Jump } from "Utils/Hooks/useJump"
import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Column,
  Flex,
  GridColumns,
  Image,
  Stack,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type { PartnerHeader_partner$data } from "__generated__/PartnerHeader_partner.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { PartnerHeaderAddress } from "./PartnerHeaderAddress"

export interface PartnerHeaderProps {
  partner: PartnerHeader_partner$data
}

// TODO: Replace with `Avatar`
export const HeaderImage = styled(Image)`
  border: 1px solid ${themeGet("colors.mono10")};
  object-fit: contain;
`

export const PartnerHeader: React.FC<
  React.PropsWithChildren<PartnerHeaderProps>
> = ({ partner }) => {
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
                <Text color="mono60" variant="sm">
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
                  {partner.hasVisibleFollowsCount &&
                    formatFollowerCount(partner.profile.counts.follows)}
                </FollowButtonInlineCount>
              )}
            </FollowButtonContainer>

            {partner.hasVisibleFollowsCount && (
              <Text
                variant="xs"
                color="mono60"
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
        hasVisibleFollowsCount
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
