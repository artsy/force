import * as React from "react"
import {
  Box,
  Button,
  Flex,
  Join,
  Separator,
  Image,
  Spacer,
  Text,
  THEME,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { RouterLink } from "System/Components/RouterLink"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

export const introData = [
  {
    title: "Tell us about your work",
    description:
      "Start by adding an artist from our list of high demand artists. Include information such as year, medium, dimensions and materials.",
    image: "https://files.artsy.net/images/01_submission_intro_artwork.png",
  },
  {
    title: "Upload artwork images",
    description:
      "Improve your chances of selling by including photographs of the front, back, frame, signature, and other details.",
    image: "https://files.artsy.net/images/02_submission_intro_upload.png",
  },
  {
    title: "Complete submission",
    description:
      "Your work will be submitted to an Artsy advisor who will assess whether your work is eligible and help guide you on next steps.",
    image: "https://files.artsy.net/images/03_submission_intro_advisor.png",
  },
]

export const IntroRoute: React.FC = () => {
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)
  return (
    <AppContainer>
      <SubmissionLayout hideNavigation>
        <Flex height="100%" flexDirection="column" overflowY="auto">
          <Text variant={["lg-display", "xl"]}>It’s easy to sell on Artsy</Text>

          <Spacer y={4} />

          <Join separator={<Separator my={2} color="black5" />}>
            {introData.map((intro, index) => (
              <Flex key={index} justifyContent="space-between">
                <Text variant={["sm-display", "lg"]}>{index + 1}</Text>
                <Box px={1}>
                  <Text variant={["sm-display", "lg"]}>{intro.title}</Text>
                  <Text variant={["xs", "sm"]} color="black60">
                    {intro.description}
                  </Text>
                </Box>
                <Image
                  src={intro.image}
                  srcSet={intro.image}
                  alt={`Step ${index + 1}`}
                  width={[70, 100]}
                  height={[70, 100]}
                  style={{ objectFit: "cover" }}
                />
              </Flex>
            ))}
          </Join>

          <Spacer y={6} />

          <Flex
            gap="2"
            width="100%"
            bg="white100"
            position={isMobile ? "fixed" : "relative"}
            bottom={isMobile ? 0 : undefined}
            left={isMobile ? 0 : undefined}
            px={isMobile ? 2 : 0}
            py={isMobile ? 4 : 0}
          >
            <Button
              // @ts-ignore
              as={RouterLink}
              to="/sell2/submissions/new"
              width="100%"
            >
              Start New Submission
            </Button>

            {
              //TODO: uncomment when ChooseFromMyCollection feature is ready
              /* <Button
                  // @ts-ignore
                  as={RouterLink}
                  to="/sell2/submissions/new/collection"
                  width="100%"
                >
                  New from My Collection
                </Button> */
            }
          </Flex>
        </Flex>
      </SubmissionLayout>
    </AppContainer>
  )
}
