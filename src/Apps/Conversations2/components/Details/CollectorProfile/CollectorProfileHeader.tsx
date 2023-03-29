import { Avatar, Box, Flex, Spacer, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { CollectorProfileHeader_user$key } from "__generated__/CollectorProfileHeader_user.graphql"
import { Verifications } from "./CollectorProfileVerifications"

interface CollectorProfileHeaderProps {
  user: CollectorProfileHeader_user$key
}

export const CollectorProfileHeader = ({
  user,
}: CollectorProfileHeaderProps) => {
  const data = useFragment(
    graphql`
      fragment CollectorProfileHeader_user on User {
        initials
        collectorProfile {
          name
          artsyUserSince(format: "YYYY")
          ...CollectorProfileVerifications_collectorProfileType
        }
      }
    `,
    user
  )

  if (!data) return null

  const { initials, collectorProfile } = data

  return (
    <>
      <Text variant="lg">Collector Profile</Text>
      <Spacer y={2} />
      <Flex>
        <Box>
          <Avatar
            backgroundColor="black10"
            size="xs"
            initials={initials ?? ""}
          />
        </Box>
        <Box mx={10}>
          <Flex>
            <Text variant="md" color="black100">
              {collectorProfile?.name}
            </Text>
          </Flex>
          {collectorProfile?.artsyUserSince && (
            <Flex flexDirection="column">
              <Text color="black60" variant="sm">
                Member since {collectorProfile.artsyUserSince}
              </Text>
            </Flex>
          )}
          <Verifications verificationFields={data.collectorProfile!} />
        </Box>
      </Flex>
    </>
  )
}
