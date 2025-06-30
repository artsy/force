import { Column, GridColumns, ResponsiveBox, Text } from "@artsy/palette"
import { AboutSection } from "Apps/About2/Components/AboutSection"

export const AboutOurStory = () => {
  return (
    <AboutSection id="our-story">
      <GridColumns gridRowGap={4}>
        <Column span={6} display="flex" justifyContent="center">
          <ResponsiveBox
            aspectWidth={1}
            aspectHeight={1}
            maxWidth="100%"
            bg="mono10"
          />
        </Column>

        <Column
          span={[12, 6, 4]}
          start={[1, 7, 8]}
          display="flex"
          justifyContent="center"
          gap={2}
          flexDirection="column"
        >
          <Text variant="xl">Our story</Text>

          <Text variant="sm">
            Artsy was founded in 2009 by Carter Cleveland, a computer science
            student with a passion for art and a vision to make it more
            accessible. What began as a platform to help people find art online
            has grown into the largest art marketplace of its kind.
          </Text>

          <Text variant="sm">
            Today, over 3.4 million collectors and enthusiasts use Artsy to
            browse, learn, and purchase works from the most respected names in
            contemporary and modern art. We’re proud to support the full
            spectrum of the art world—from major fairs and blue-chip galleries
            to independent artists and new buyers.
          </Text>

          <Text variant="sm">
            Our goal hasn’t changed:
            <br />
            <strong>To open the art world to everyone, everywhere.</strong>
          </Text>
        </Column>
      </GridColumns>
    </AboutSection>
  )
}
