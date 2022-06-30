import { Box, Text, GridColumns, Column, Button } from "@artsy/palette"
import { Masonry } from "../Masonry"
import { ContentHeaderExample } from "./Components/ContentHeaderExample"
import { ContentMetadataExample } from "./Components/ContentMetadataExample"
import { Page } from "./Components/Page"
import { TombstoneExample } from "./Components/TombstoneExample"

export default {
  title: "Molecules/Content",
  parameters: {
    layout: "fullscreen",
  },
}

export const Content2Up = () => {
  return (
    <Page title="<Content2Up />">
      <ContentHeaderExample mb={4} />

      <GridColumns>
        <Column span={6}>
          <Box bg="black30" height={480} mb={2} />

          <ContentMetadataExample />

          <GridColumns>
            <Column span={8}>
              <Button width="100%">Button Title</Button>
            </Column>
          </GridColumns>
        </Column>

        <Column span={6}>
          <Box bg="black30" height={480} mb={2} />

          <ContentMetadataExample />

          <GridColumns>
            <Column span={8}>
              <Button width="100%">Button Title</Button>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
    </Page>
  )
}

export const Content4Up = () => {
  return (
    <Page title="<Content4Up />">
      <ContentHeaderExample mb={4} />

      <GridColumns>
        <Column span={[12, 6, 3]}>
          <Box bg="black30" height={420} mb={2} />
          <ContentMetadataExample />
          <Button width="100%">Button Title</Button>
        </Column>

        <Column span={[12, 6, 3]}>
          <Box bg="black30" height={420} mb={2} />
          <ContentMetadataExample />
          <Button width="100%">Button Title</Button>
        </Column>

        <Column span={[12, 6, 3]}>
          <Box bg="black30" height={420} mb={2} />
          <ContentMetadataExample />
          <Button width="100%">Button Title</Button>
        </Column>

        <Column span={[12, 6, 3]}>
          <Box bg="black30" height={420} mb={2} />
          <ContentMetadataExample />
          <Button width="100%">Button Title</Button>
        </Column>
      </GridColumns>
    </Page>
  )
}

export const ContentFixedLeftScrollRight = () => {
  return (
    <Page title="<ContentFixedLeftScrollRight />">
      <GridColumns>
        <Column span={6}>
          <Box bg="black30" height={720} mb={2} />

          <ContentMetadataExample />

          <GridColumns>
            <Column span={8}>
              <Button width="100%">Button Title</Button>
            </Column>
          </GridColumns>
        </Column>

        <Column span={6}>
          <Masonry columnCount={2}>
            <Box mb={4}>
              <Box bg="black30" height={214} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={234} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={484} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={272} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={414} mb={1} />
              <TombstoneExample />
            </Box>

            <Box mb={4}>
              <Box bg="black30" height={478} mb={1} />
              <TombstoneExample />
            </Box>
          </Masonry>
        </Column>
      </GridColumns>
    </Page>
  )
}

export const ContentScrollLeftFixedRight = () => {
  return (
    <Page title="<ContentScrollLeftFixedRight />">
      <GridColumns>
        <Column span={6}>
          <Masonry columnCount={2}>
            <Box mb={6}>
              <Box bg="black30" height={420} mb={1} />

              <Text variant="xs" mb={1}>
                Category
              </Text>

              <Text variant="lg-display" mb={1}>
                This Artwork Changed My Life: Sally Mann’s “Untitled Film
                Stills”
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Text variant="xs" mb={1}>
                Category
              </Text>

              <Text variant="xl" mb={1}>
                5 Must-See Shows from Gallery Weekend Berlin
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Box bg="black30" height={320} mb={1} />

              <Text variant="xs" mb={1}>
                Category
              </Text>

              <Text variant="lg-display" mb={1}>
                Why Painter Eddie Martinez Is Having His Biggest Market Year Yet
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Box bg="black30" height={260} mb={1} />

              <Text variant="xs" mb={1}>
                Category
              </Text>

              <Text variant="lg-display" mb={1}>
                ‘The Season’s Been Extended Indefinitely’: Manhattan Dealers Who
                Opened Hamptons Outposts This Summer Are There to Stay
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Text variant="xs" mb={1}>
                Category
              </Text>

              <Text variant="xl" mb={1}>
                Arts Sector Is Facing a Brain Drain as Ambitious Workers Seek
                Greener Pastures
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>

            <Box mb={6}>
              <Box bg="black30" height={200} mb={1} />

              <Text variant="xs" mb={1}>
                Category
              </Text>

              <Text variant="lg-display" mb={1}>
                FIAC Has Canceled Its 2020 Fair in Paris, Saying It Could Not
                Meet the ‘Legitimate Expectations’ of Visitors
              </Text>

              <Text variant="xs">By Author Name</Text>
            </Box>
          </Masonry>
        </Column>

        <Column span={6}>
          <Box bg="black30" height={720} mb={2} />

          <ContentMetadataExample />

          <GridColumns>
            <Column span={8}>
              <Button width="100%">Button Title</Button>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
    </Page>
  )
}
