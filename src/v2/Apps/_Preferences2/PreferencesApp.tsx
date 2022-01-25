import {
  Box,
  Button,
  Checkbox,
  Column,
  Flex,
  GridColumns,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { useState } from "react"

export const PreferencesApp: React.FC = () => {
  const [uncheckedAll, setUncheckedAll] = useState(false)

  return (
    <>
      <Text variant="xl" mt={4} mb={12}>
        Preferences Center
      </Text>

      <Separator mt={2} />

      <GridColumns>
        <Column
          span={10}
          mt={2}
        >
          <Flex p={2}>
            <Box>
              <Text variant="md">Recommended By Artsy</Text>
              <Text variant="sm" color="black60">
                Artworks, shows, fairs, auctions, and collections we think you'll
                love
              </Text>
            </Box>
          </Flex>

          <Flex p={2}>
            <Box>
              <Text variant="md">Art World Insights</Text>
              <Text variant="sm" color="black60">
                Market stories, artist profiles, exhibition reviews, and more art
                world insights
              </Text>
            </Box>
          </Flex>

          <Flex p={2}>
            <Box>
              <Text variant="md">Product Updates</Text>
              <Text variant="sm" color="black60">
                Announcements of new features on Artsy.net and the mobile app
              </Text>
            </Box>
          </Flex>

          <Flex p={2}>
            <Box>
              <Text variant="md">Guidance on Collecting</Text>
              <Text variant="sm" color="black60">
                Expert advice on buying and selling art, directly from an Artsy
                specialist
              </Text>
            </Box>
          </Flex>

          <Flex p={2}>
            <Box>
              <Text variant="md">Custom Alerts</Text>
              <Text variant="sm" color="black60">
                A round up of updates on your favorite artists, chosen by you
              </Text>
            </Box>
          </Flex>
        </Column>

        <Column
          span={2}
          mt={4}
        >
          <Flex 
            pl={2}
            pt={2}
          >
            <Box>
              <Checkbox selected={!uncheckedAll}>Email</Checkbox>
            </Box>
          </Flex>
          <Flex 
            pl={2}
            pt={6}
          >
            <Box>
              <Checkbox selected={!uncheckedAll}>Email</Checkbox>
            </Box>
          </Flex>
          <Flex 
            pl={2}
            pt={6}
          >
            <Box>
              <Checkbox selected={!uncheckedAll}>Email</Checkbox>
            </Box>
          </Flex>
          <Flex 
            pl={2}
            pt={6}
          >
            <Box>
              <Checkbox selected={!uncheckedAll}>Email</Checkbox>
            </Box>
          </Flex>
          <Flex 
            pl={2}
            pt={6}
          >
            <Box>
              <Checkbox selected={!uncheckedAll}>Email</Checkbox>
            </Box>
          </Flex>
        </Column>

      </GridColumns>

      <Separator mt={2} />

      <GridColumns>
        <Column
          span={10}
          mt={2}
        >
          <Flex p={2}>
            <Box>
              <Text variant="md">Unsubscribe from all</Text>
            </Box>
          </Flex>
        </Column>

        <Column
          span={2}
          mt={2}
        >
          <Flex p={2}>
            <Box>
              <Checkbox
                onSelect={result => setUncheckedAll(result)}
                selected={uncheckedAll}
              >
                Email
              </Checkbox>
            </Box>
          </Flex>
        </Column>
      </GridColumns>

      <Flex
        justifyContent="flex-end"
        pt={4}
        pr={4}
      >
        <Button width={["100%", "auto"]}>Cancel</Button>
        <Spacer ml={1} />
        <Button width={["100%", "auto"]}>Save</Button>
      </Flex>
    </>
  )
}
