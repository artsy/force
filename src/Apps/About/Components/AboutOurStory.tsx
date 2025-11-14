import { AboutSection } from "Apps/About/Components/AboutSection"
import { resized } from "Utils/resized"
import { Column, GridColumns, Image, ResponsiveBox, Text } from "@artsy/palette"

export const AboutOurStory = () => {
  const { srcSet, src } = resized(
    "https://files.artsy.net/images/about2-story.jpg",
    { width: 800 },
  )

  return (
    <AboutSection id="our-story">
      <GridColumns gridRowGap={4}>
        <Column
          span={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ResponsiveBox
            aspectWidth={1890}
            aspectHeight={1839}
            maxWidth="100%"
            bg="mono10"
          >
            <Image
              src={src}
              srcSet={srcSet}
              width="100%"
              height="100%"
              alt=""
              lazyLoad
            />
          </ResponsiveBox>
        </Column>

        <Column
          span={[12, 6, 4]}
          start={[1, 7, 8]}
          display="flex"
          justifyContent="center"
          gap={2}
          flexDirection="column"
        >
          <Text variant="xl">Our Story</Text>

          <Text variant="sm">
            Artsy was founded in 2009 by Carter Cleveland, a computer science
            student with a passion for art and a vision to make it more
            accessible. What began as a platform to help people find art online
            has grown into the largest art marketplace of its kind.
          </Text>

          <Text variant="sm">
            Today, over 3.4 million collectors and enthusiasts use Artsy to
            browse, learn about, and purchase works from the most respected
            names in contemporary and modern art. We’re proud to support the
            full spectrum of the art world—from major fairs and blue-chip
            galleries to independent artists and new buyers.
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
