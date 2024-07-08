import {
  Box,
  Button,
  Flex,
  FullBleed,
  Image,
  Join,
  Separator,
  Spacer,
  THEME,
  Text,
} from "@artsy/palette"
import { SellMeta } from "Apps/Consign/Routes/MarketingLanding/Components/SellMeta"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { useSubmissionTracking } from "Apps/Sell/Hooks/useSubmissionTracking"
import { RouterLink } from "System/Components/RouterLink"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { cropped } from "Utils/resized"
import * as React from "react"

export const IntroRoute: React.FC = () => {
  const { trackTappedNewSubmission } = useSubmissionTracking()
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  return (
    <FullBleed>
      <SellMeta />

      <SubmissionLayout hideNavigation>
        <Flex
          height={isMobile ? "100%" : undefined}
          flexDirection="column"
          overflowY="auto"
        >
          <Flex flex={1} overflowY="auto" flexDirection="column">
            <Text variant={["lg-display", "xl"]}>
              It’s easy to sell on Artsy
            </Text>

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

                  <Flex width={[70, 100]} height={[70, 100]}>
                    <Image
                      {...cropped(intro.image, { width: 100, height: 100 })}
                      alt={`Step ${index + 1}`}
                      width={[70, 100]}
                      height={[70, 100]}
                    />
                  </Flex>
                </Flex>
              ))}
            </Join>
          </Flex>

          <Flex gap="2" width="100%" pt={[2, 6]}>
            <Button
              // @ts-ignore
              as={RouterLink}
              onClick={() => {
                trackTappedNewSubmission()
              }}
              to="/sell/submissions/new"
              width="100%"
              data-testid="start-new-submission"
            >
              Start New Submission
            </Button>

            {/* TODO: uncomment when ChooseFromMyCollection feature is ready */}
            {/* TODO : Add tests for the button */}
            {/* TODO : Add tracking */}
            {/* <Button
                  // @ts-ignore
                  as={RouterLink}
                  onClick={() => {
                    trackTappedStartMyCollection()
                  }
                  to="/sell/submissions/new/collection"
                  width="100%"
                >
                  New from My Collection
                </Button>  */}
          </Flex>
        </Flex>
      </SubmissionLayout>
    </FullBleed>
  )
}

const introData = [
  {
    title: "Tell us about your work",
    description:
      "Start by adding an artist from our list of high demand artists. Include information such as year, medium, dimensions and materials.",
    image: "https://files.artsy.net/images/01_submission_intro_artwork.jpg",
  },
  {
    title: "Upload artwork images",
    description:
      "Improve your chances of selling by including photographs of the front, back, frame, signature, and other details.",
    image: "https://files.artsy.net/images/02_submission_intro_upload.jpg",
  },
  {
    title: "Complete submission",
    description:
      "Your work will be submitted to an Artsy advisor who will assess whether your work is eligible and help guide you on next steps.",
    image: "https://files.artsy.net/images/03_submission_intro_advisor.jpg",
  },
]
