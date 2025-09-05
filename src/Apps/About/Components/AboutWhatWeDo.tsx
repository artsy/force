import { Column, GridColumns, Stack, Text, useTheme } from "@artsy/palette"
import { AboutSection } from "Apps/About/Components/AboutSection"
import { RouterLink } from "System/Components/RouterLink"

export const AboutWhatWeDo = () => {
  return (
    <AboutSection id="what-we-do">
      <GridColumns gridRowGap={4}>
        <Column
          span={[12, 6, 4]}
          start={[1, 1, 2]}
          display="flex"
          alignItems="center"
        >
          <Stack gap={2}>
            <Text variant="xl">What We Do</Text>

            <Text variant={["sm", "lg"]}>
              Make the art world accessible through expert curation, editorial
              content, and personalized recommendations.
            </Text>

            <Text variant={["sm", "lg"]}>
              In a fragmented industry, Artsy brings everything together, giving
              you the tools to make living with art easy, inspiring, and
              inevitable.
            </Text>
          </Stack>
        </Column>

        <Column span={[12, 6, 4]} start={[1, 7, 8]}>
          <Stack gap={2}>
            <AboutWhatWeDoItem
              title="Global Art Discovery"
              description="Discover and buy original artworks from the world’s leading artists, all in one place. From New York to Seoul, Artsy brings the global art market to your fingertips."
            />

            <AboutWhatWeDoItem
              title="Personalized Recommendations"
              description="Follow artists, save favorite works, and receive alerts when new pieces become available. Your collecting journey is uniquely yours—we just make it easier."
            />

            <AboutWhatWeDoItem
              title="Transparent Pricing & Market Access"
              description="Make informed decisions with access to pricing insights, past auction results, and side-by-side comparisons."
            />

            <AboutWhatWeDoItem
              title="Seamless, Secure Transactions"
              description={
                <>
                  Buy art with ease with a trusted, secure checkout experience
                  on our platform. No guesswork—just art, delivered to your
                  door. Learn more about the{" "}
                  <RouterLink to="/buyer-guarantee">Artsy Guarantee</RouterLink>
                  .
                </>
              }
            />

            <AboutWhatWeDoItem
              title="Expert Insights & Curation"
              description="Stay up-to-date with emerging artists, market trends, and deep editorial storytelling. Whether you’re curious or collecting, Artsy helps you build knowledge with confidence."
            />
          </Stack>
        </Column>
      </GridColumns>
    </AboutSection>
  )
}

interface AboutWhatWeDoItemProps {
  title: string
  description: React.ReactNode
}

const AboutWhatWeDoItem = ({ title, description }: AboutWhatWeDoItemProps) => {
  const { theme } = useTheme()
  return (
    <Stack
      gap={1}
      p={[2, 0]}
      borderRadius={[10, 0]}
      boxShadow={[theme.effects.dropShadow, "none"]}
    >
      <Text variant="lg-display">{title}</Text>

      <Text variant="sm" color="mono60">
        {description}
      </Text>
    </Stack>
  )
}
