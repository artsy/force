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
} from "@artsy/palette"
import { useRouter } from "System/Hooks/useRouter"
import { AppContainer } from "Apps/Components/AppContainer"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"

export const introData = [
  {
    number: "1",
    title: "Tell us about your work",
    description:
      "Start by adding an artist from our list of high demand artists. Include information such as year, medium, dimensions and materials.",
    image: "https://files.artsy.net/images/01_submission_artwork.png",
  },
  {
    number: "2",
    title: "Upload artwork images",
    description:
      "Improve your chances of selling by including photographs of the front, back, frame, signature, and other details.",
    image: "https://files.artsy.net/images/02_submission_upload.png",
  },
  {
    number: "3",
    title: "Complete submission",
    description:
      "Your work will be submitted to an Artsy advisor who will assess whether your work is eligible and help guide you on next steps.",
    image: "https://files.artsy.net/images/03_submission_advisor.png",
  },
]

export const IntroRoute: React.FC = () => {
  const { router } = useRouter()

  const onCreateSubmission = () => {
    router.push("/sell2/submissions/new")
  }

  //TODO: uncomment when ChooseFromMyCollection feature is ready
  // const onChooseFromMyCollection = () => {
  //   router.push("/sell2/submissions/new/collection")
  // }

  return (
    <AppContainer>
      <SubmissionHeader />
      <Flex py={4} flexDirection="column" alignItems="center">
        <Box maxWidth={600}>
          <Text variant="xl">It’s easy to sell on Artsy</Text>
          <Spacer y={4} />
          <Join separator={<Separator my={2} color="black5" />}>
            {introData.map((intro, index) => (
              <Flex key={index} justifyContent="space-between">
                <Text variant="lg">{intro.number}</Text>
                <Box pl={1}>
                  <Text variant="lg">{intro.title}</Text>
                  <Text variant="sm" color="black60">
                    {intro.description}
                  </Text>
                </Box>
                <Image src={intro.image} alt="intro" width={100} height={100} />
              </Flex>
            ))}
          </Join>
          <Spacer y={6} />
          <Flex gap="2">
            <Button onClick={onCreateSubmission} width="100%">
              Start New Submission
            </Button>

            {
              //TODO: uncomment when ChooseFromMyCollection feature is ready
              /* <Button
              onClick={onChooseFromMyCollection}
              variant={"secondaryBlack"}
              width="100%"
            >
              New from My Collection
            </Button> */
            }
          </Flex>
        </Box>
      </Flex>
    </AppContainer>
  )
}
