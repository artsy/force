import { Avatar, Box, Flex, Stack, Text, Tooltip } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { CollectorProfileHeader_me$data } from "__generated__/CollectorProfileHeader_me.graphql"
import MapPinIcon from "@artsy/icons/MapPinIcon"
import ShieldIcon from "@artsy/icons/ShieldIcon"
import VerifiedPersonIcon from "@artsy/icons/VerifiedPersonIcon"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { Media } from "Utils/Responsive"

interface CollectorProfileHeaderProps {
  me: CollectorProfileHeader_me$data
}

const CollectorProfileHeader: React.FC<CollectorProfileHeaderProps> = ({
  me,
}) => {
  const collectorProfile = me.collectorProfile
  const hasBadge = !!(
    collectorProfile?.confirmedBuyerAt || collectorProfile?.isIdentityVerified
  )

  return (
    <Flex justifyContent="space-between" gap={2}>
      <Flex gap={2} minWidth={0}>
        <Media greaterThan="xs">
          <Avatar
            size="md"
            initials={me.initials ?? "U"}
            src={me.icon?.cropped?.src}
            srcSet={me.icon?.cropped?.srcSet}
            border="1px solid"
            borderColor="black10"
          />
        </Media>

        <Media at="xs">
          <Avatar
            size="sm"
            initials={me.initials ?? "U"}
            src={me.icon?.cropped?.src}
            srcSet={me.icon?.cropped?.srcSet}
            border="1px solid"
            borderColor="black10"
          />
        </Media>

        <Flex
          flex={1}
          flexDirection="column"
          justifyContent="center"
          gap={[0.5, 1]}
          minWidth={0}
        >
          <Flex gap={1} alignItems="center">
            <Text variant={["md", "xl"]}>{me.name}</Text>

            {hasBadge && (
              <Stack gap={0.5} flexDirection="row" flexWrap="wrap">
                {collectorProfile.confirmedBuyerAt && (
                  <Tooltip content="Confirmed Buyer">
                    <Box as="span" style={{ lineHeight: 0 }}>
                      <UserVerifiedIcon />
                    </Box>
                  </Tooltip>
                )}

                {collectorProfile.isIdentityVerified && (
                  <Tooltip content="ID Verified">
                    <Box as="span" style={{ lineHeight: 0 }}>
                      <ShieldIcon />
                    </Box>
                  </Tooltip>
                )}
              </Stack>
            )}
          </Flex>

          {!!me.location?.display && (
            <Media greaterThan="xs">
              <Flex gap={0.5} alignItems="center">
                <MapPinIcon />

                <Text variant={["xs", "sm-display"]} overflowEllipsis>
                  {me.location.display}
                </Text>
              </Flex>
            </Media>
          )}

          <Media at="xs">
            <Text variant="xs" display="flex" gap={2}>
              <RouterLink to="/favorites/saves" textDecoration="underline">
                Favorites
              </RouterLink>

              <RouterLink
                to="/settings/edit-profile"
                textDecoration="underline"
              >
                Settings
              </RouterLink>
            </Text>
          </Media>
        </Flex>
      </Flex>

      <Media greaterThan="xs">
        <Text variant="sm-display" display="flex" gap={2}>
          <RouterLink to="/favorites/saves" textDecoration="underline">
            Favorites
          </RouterLink>

          <RouterLink to="/settings/edit-profile" textDecoration="underline">
            Settings
          </RouterLink>
        </Text>
      </Media>
    </Flex>
  )
}

export const CollectorProfileHeaderFragmentContainer = createFragmentContainer(
  CollectorProfileHeader,
  {
    me: graphql`
      fragment CollectorProfileHeader_me on Me {
        ...CollectorProfileHeaderAvatar_me
        name
        initials
        icon {
          cropped(height: 100, width: 100) {
            src
            srcSet
          }
        }
        location {
          display
        }
        collectorProfile {
          isIdentityVerified
          confirmedBuyerAt
        }
      }
    `,
  }
)

/**
 * VerifiedPersonIcon with a `green100` checkmark.
 * We style it here (vs a full color icon) is because it utilizes a themed color value.
 */
const UserVerifiedIcon = styled(VerifiedPersonIcon)`
  path:last-child {
    fill: ${themeGet("colors.green100")};
  }
`
