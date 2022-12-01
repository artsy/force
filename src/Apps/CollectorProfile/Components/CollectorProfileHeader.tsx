import { Box, Button, Flex, SettingsIcon, Spacer, Text } from "@artsy/palette"
import { CollectorProfileHeaderAvatarFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeaderAvatar"
import { CollectorProfileHeaderInfoFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeaderInfo"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { CollectorProfileHeader_me$data } from "__generated__/CollectorProfileHeader_me.graphql"

interface CollectorProfileHeaderProps {
  me: CollectorProfileHeader_me$data
}

const CollectorProfileHeader: React.FC<CollectorProfileHeaderProps> = ({
  me,
}) => {
  const { name, createdAt, bio } = me

  return (
    <>
      <Spacer mt={[2, 4]} />

      <Flex>
        <CollectorProfileHeaderAvatarFragmentContainer me={me} />

        <Flex
          flex={1}
          flexDirection="column"
          justifyContent="center"
          ml={[1, 2]}
        >
          <Text variant={["md", "xl"]}>{name}</Text>
          {!!createdAt && (
            <Text variant={["xs", "sm-display"]} color="black60">
              {`Member since ${new Date(createdAt).getFullYear()}`}
            </Text>
          )}
        </Flex>

        <Media lessThan="sm">
          <RouterLink to="">
            <SettingsIcon />
          </RouterLink>
        </Media>

        <Media greaterThanOrEqual="sm">
          <Button
            // @ts-ignore
            as={RouterLink}
            to=""
            variant="secondaryBlack"
            size="large"
          >
            Settings
          </Button>
        </Media>
      </Flex>

      <Spacer mt={2} />

      <Box mb={2}>
        {!!bio && <Text variant={["xs", "sm-display"]}>{bio}</Text>}

        <Spacer mt={[1, 2]} />

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
