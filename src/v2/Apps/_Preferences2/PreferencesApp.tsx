import {
  Box,
  Button,
  Checkbox,
  Column,
  Flex,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { useState } from "react"

export const PreferencesApp: React.FC = () => {
  const [checkedAll, setCheckedAll] = useState(false)

  return (
    <>
      <Text variant="xl" mt={4}>
        Preferences Center
      </Text>
      <Column
        span={12}
        pb={2}
        pr={12}
        mt={6}
        display="flex"
        justifyContent="space-between"
      >
        <Flex p={2} flexDirection="column">
          <Box flexBasis={"50%"}>
            <Text variant={"md"}>Subscribe to all</Text>
          </Box>
        </Flex>
        <Flex p={2} flexDirection={"column"}>
          <Box flexBasis={"50%"}>
            <Checkbox
              onSelect={result => setCheckedAll(result)}
              selected={checkedAll}
            >
              Email
            </Checkbox>
          </Box>
        </Flex>
      </Column>

      <Separator mt={2} />

      <Column
        span={12}
        pb={2}
        pr={12}
        mt={2}
        display="flex"
        justifyContent="space-between"
      >
        <Flex p={2} flexDirection="column">
          <Box flexBasis={"50%"}>
            <Text variant="md">Recommended By Artsy</Text>
            <Text variant="sm" color="black60">
              Artworks, shows, fairs, auctions, and collections we think you'll
              love
            </Text>
          </Box>
        </Flex>
        <Flex p={2} flexDirection={"column"}>
          <Box flexBasis={"50%"}>
            <Checkbox selected={checkedAll}>Email</Checkbox>
          </Box>
        </Flex>
      </Column>

      <Column
        span={12}
        pb={2}
        pr={12}
        display="flex"
        justifyContent="space-between"
      >
        <Flex p={2} flexDirection="column">
          <Box flexBasis={"50%"}>
            <Text variant="md">Art World Insights</Text>
            <Text variant="sm" color="black60">
              Market stories, artist profiles, exhibition reviews, and more art
              world insights
            </Text>
          </Box>
        </Flex>
        <Flex p={2} flexDirection={"column"}>
          <Box flexBasis={"50%"}>
            <Checkbox selected={checkedAll}>Email</Checkbox>
          </Box>
        </Flex>
      </Column>

      <Column
        span={12}
        pb={2}
        pr={12}
        display="flex"
        justifyContent="space-between"
      >
        <Flex p={2} flexDirection="column">
          <Box flexBasis={"50%"}>
            <Text variant="md">Product Updates</Text>
            <Text variant="sm" color="black60">
              Announcements of new features on Artsy.net and the mobile app
            </Text>
          </Box>
        </Flex>
        <Flex p={2} flexDirection={"column"}>
          <Box flexBasis={"50%"}>
            <Checkbox selected={checkedAll}>Email</Checkbox>
          </Box>
        </Flex>
      </Column>

      <Column
        span={12}
        pb={2}
        pr={12}
        display="flex"
        justifyContent="space-between"
      >
        <Flex p={2} flexDirection="column">
          <Box flexBasis={"50%"}>
            <Text variant="md">Guidance on Collecting</Text>
            <Text variant="sm" color="black60">
              Expert advice on buying and selling art, directly from an Artsy
              specialist
            </Text>
          </Box>
        </Flex>
        <Flex p={2} flexDirection={"column"}>
          <Box flexBasis={"50%"}>
            <Checkbox selected={checkedAll}>Email</Checkbox>
          </Box>
        </Flex>
      </Column>

      <Column
        span={12}
        pb={2}
        pr={12}
        display="flex"
        justifyContent="space-between"
      >
        <Flex p={2} flexDirection="column">
          <Box flexBasis={"50%"}>
            <Text variant="md">Custom Alerts</Text>
            <Text variant="sm" color="black60">
              A round up of updates on your favorite artists, chosen by you
            </Text>
          </Box>
        </Flex>
        <Flex p={2} flexDirection={"column"}>
          <Box flexBasis={"50%"}>
            <Checkbox selected={checkedAll}>Email</Checkbox>
          </Box>
        </Flex>
      </Column>

      <Separator mt={2} />

      <Column
        span={12}
        pb={2}
        pr={12}
        pt={2}
        display="flex"
        justifyContent="space-between"
      >
        <Flex p={2} flexDirection="column">
          <Box flexBasis={"50%"}>
            <Text variant="md">Unsubscribe from all</Text>
          </Box>
        </Flex>
        <Flex p={2} flexDirection={"column"}>
          <Box flexBasis={"50%"}>
            <Checkbox selected={!checkedAll}>Email</Checkbox>
          </Box>
        </Flex>
      </Column>

      <Flex
        flexBasis="50%"
        alignItems="center"
        justifyContent="flex-end"
        pt={2}
        pr={4}
      >
        <>
          <Button width={["100%", "auto"]}>Cancel</Button>

          <Spacer ml={1} />

          <Button width={["100%", "auto"]}>Save</Button>
        </>
      </Flex>
    </>
  )
}
