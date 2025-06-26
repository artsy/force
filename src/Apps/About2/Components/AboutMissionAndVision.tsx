import { Column, GridColumns, ResponsiveBox, Stack, Text } from "@artsy/palette"
import { AboutSection } from "Apps/About2/Components/AboutSection"

export const AboutMissionAndVision = () => {
  return (
    <AboutSection id="mission-and-vision">
      <Stack gap={4}>
        <Text variant="xl" display={["block", "none"]}>
          Mission and Vision
        </Text>

        <GridColumns gridRowGap={[4, 6]}>
          <Column
            span={5}
            start={2}
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center"
            order={[1, 0]}
          >
            <Text variant="sm-display">Our mission:</Text>

            <Text variant={["lg-display", "xl"]}>
              Expand the Art Market to Support More Artists
            </Text>

            <Text variant="sm" color="mono60" style={{ textWrap: "balance" }}>
              We’re making it easier for more people to buy art—empowering even
              more artists to build sustainable careers and keep creating.
            </Text>
          </Column>

          <Column
            span={5}
            display="flex"
            justifyContent="center"
            order={[0, 1]}
          >
            <ResponsiveBox
              aspectWidth={4}
              aspectHeight={3}
              maxWidth="100%"
              bg="mono10"
            />
          </Column>

          <Column
            span={5}
            start={2}
            display="flex"
            justifyContent="center"
            order={2}
          >
            <ResponsiveBox
              aspectWidth={4}
              aspectHeight={3}
              maxWidth="100%"
              bg="mono10"
            />
          </Column>

          <Column
            span={5}
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center"
            order={3}
          >
            <Text variant="sm-display">Our vision:</Text>

            <Text variant={["lg-display", "xl"]}>
              A World Where Everyone Is Moved by Art Every Day
            </Text>

            <Text variant="sm" color="mono60" style={{ textWrap: "balance" }}>
              We bring art into everyday life by providing the tools and
              inspiration that make connecting with art second nature.
            </Text>
          </Column>
        </GridColumns>
      </Stack>
    </AboutSection>
  )
}
