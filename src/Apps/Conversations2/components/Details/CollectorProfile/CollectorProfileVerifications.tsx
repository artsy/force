import { Box, Flex, Spacer, Text } from "@artsy/palette"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import { graphql, useFragment } from "react-relay"
import { CollectorProfileVerifications_collectorProfileType$key } from "__generated__/CollectorProfileVerifications_collectorProfileType.graphql"

interface VerificationProps {
  verificationFields: CollectorProfileVerifications_collectorProfileType$key
}

export const Verifications: React.FC<VerificationProps> = ({
  verificationFields,
}) => {
  const data = useFragment(
    graphql`
      fragment CollectorProfileVerifications_collectorProfileType on CollectorProfileType {
        isIdentityVerified
        isEmailConfirmed
      }
    `,
    verificationFields
  )

  if (!data) {
    return null
  }

  const { isIdentityVerified, isEmailConfirmed } = data
  return (
    <Box>
      <Flex alignItems="center" my={0.5}>
        <Flex alignItems="center">
          {isIdentityVerified ? (
            <CheckmarkFillIcon fill="green100" mr={0.5} />
          ) : (
            <CheckmarkStrokeIcon fill="black30" mr={0.5} />
          )}
        </Flex>
        <Text variant="sm" color="black100">
          ID {isIdentityVerified ? "" : "not"} verified
        </Text>
      </Flex>
      <Spacer y={0.5} />
      <Flex alignItems="center">
        <Flex alignItems="center">
          {isEmailConfirmed ? (
            <CheckmarkFillIcon fill="green100" mr={0.5} />
          ) : (
            <CheckmarkStrokeIcon fill="black30" mr={0.5} />
          )}
        </Flex>
        <Text variant="sm" color="black100">
          Email Address {isEmailConfirmed ? "" : "not"} verified
        </Text>
      </Flex>
    </Box>
  )
}
