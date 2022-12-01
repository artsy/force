import { Box, Button, Flex, SettingsIcon, Spacer, Text } from "@artsy/palette"
import { CollectorProfileHeaderAvatar } from "Apps/CollectorProfile/Components/CollectorProfileHeaderAvatar"
import { CollectorProfileHeaderInfo } from "Apps/CollectorProfile/Components/CollectorProfileHeaderInfo"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"

const CollectorProfileHeader: React.FC = () => {
  return (
    <>
      <Spacer mt={[2, 4]} />

      <Flex>
        <CollectorProfileHeaderAvatar />

        <Flex
          flex={1}
          flexDirection="column"
          justifyContent="center"
          ml={[1, 2]}
        >
          <Text variant={["md", "xl"]}>Name</Text>
          <Text variant={["xs", "sm-display"]} color="black60">
            since
          </Text>
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
        <Text variant={["xs", "sm-display"]}>Bio</Text>

        <Spacer mt={[1, 2]} />

        <Flex>
          <CollectorProfileHeaderInfo type="Location" value="Sup" />
          <CollectorProfileHeaderInfo type="Profession" value="Yo" />
          <CollectorProfileHeaderInfo
            type="OtherRelevantPositions"
            value="Jaa"
          />
        </Flex>
      </Box>
    </>
  )
}

export const CollectorProfileHeaderFragmentContainer = CollectorProfileHeader
