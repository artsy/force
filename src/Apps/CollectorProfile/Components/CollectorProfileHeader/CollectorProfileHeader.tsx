import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
import { CollectorProfileHeaderAvatarFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderAvatar"
import { CollectorProfileHeaderInfoFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderInfo"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { CollectorProfileHeader_me$data } from "__generated__/CollectorProfileHeader_me.graphql"
import SettingsIcon from "@artsy/icons/SettingsIcon"

interface CollectorProfileHeaderProps {
  me: CollectorProfileHeader_me$data
}

const CollectorProfileHeader: React.FC<CollectorProfileHeaderProps> = ({
  me,
}) => {
  const { name, createdAt, bio } = me

  return (
    <>
      <Spacer y={[2, 4]} />

      <Flex>
        <CollectorProfileHeaderAvatarFragmentContainer me={me} mr={[1, 2]} />

        <Flex flex={1} flexDirection="column" justifyContent="center">
          <Text variant={["md", "xl"]}>{name}</Text>
          {!!createdAt && (
            <Text variant={["xs", "sm-display"]} color="black60">
              {`Member since ${new Date(createdAt).getFullYear()}`}
            </Text>
          )}
        </Flex>

        <Media lessThan="sm">
          <RouterLink to="/settings/edit-profile" aria-label="Settings">
            <SettingsIcon height={24} width={24} />
          </RouterLink>
        </Media>

        <Media greaterThanOrEqual="sm">
          <Button
            // @ts-ignore
            as={RouterLink}
            to="/settings/edit-profile"
            variant="secondaryBlack"
            size="large"
          >
            Settings
          </Button>
        </Media>
      </Flex>

      <Spacer y={2} />

      <Box mb={2}>
        {!!bio && (
          <Text mb={[1, 2]} variant={["xs", "sm-display"]}>
            {bio}
          </Text>
        )}

        <CollectorProfileHeaderInfoFragmentContainer me={me} />
      </Box>
    </>
  )
}

export const CollectorProfileHeaderFragmentContainer = createFragmentContainer(
  CollectorProfileHeader,
  {
    me: graphql`
      fragment CollectorProfileHeader_me on Me {
        ...CollectorProfileHeaderAvatar_me
        ...CollectorProfileHeaderInfo_me
        name
        bio
        createdAt
      }
    `,
  }
)
