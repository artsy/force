import * as React from "react"
import { Box, Button, Flex, SkeletonBox, Spacer, Text } from "@artsy/palette"
import { useRouter } from "System/Router/useRouter"
import { AppContainer } from "Apps/Components/AppContainer"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"

export const IntroRoute: React.FC = () => {
  const { router } = useRouter()

  const onCreateSubmission = () => {
    router.push("/sell2/submissions/new")
  }

  const onChooseFromMyCollection = () => {
    router.push("/sell2/submissions/new/collection")
  }

  return (
    <AppContainer>
      <SubmissionHeader />
      <Flex py={4} flexDirection="column" alignItems="center">
        <Box width={600}>
          <Text variant="lg-display">It’s easy to sell on Artsy</Text>
          <Spacer y={2} />
          <Flex justifyItems="space-between">
            <Box>
              <Text variant="md">Tell us about your work</Text>
              <Text variant="sm" color="black60">
                Start by adding an artist from our list of high demand artists.
                Include information such as year, medium, dimensions and
                materials.
              </Text>
            </Box>
            <SkeletonBox width={100} height={100} />
          </Flex>
          <Spacer y={2} />
          <Flex justifyContent="space-between">
            <Box>
              <Text variant="md">Upload arwork images</Text>
              <Text color="black60">
                Improve your chances of selling by including photographs of the
                front, back, frame, signature and other details.
              </Text>
            </Box>
            <SkeletonBox width={100} height={100} />
          </Flex>
          <Spacer y={2} />
          <Flex justifyContent="space-between">
            <Box>
              <Text variant="md">Complete submission</Text>
              <Text color="black60">
                Your work will be submitted to an Artsy advisor who will assess
                whether your work is eligible and help guide you on next steps.
              </Text>
            </Box>
            <SkeletonBox width={100} height={100} />
          </Flex>
          <Spacer y={2} />
          <Flex justifyContent="space-between" gap={2}>
            <Button onClick={onCreateSubmission}>New Submission</Button>

            <Button
              onClick={onChooseFromMyCollection}
              variant={"secondaryBlack"}
            >
              New from My Collection
            </Button>
          </Flex>
        </Box>
      </Flex>
    </AppContainer>
  )
}
