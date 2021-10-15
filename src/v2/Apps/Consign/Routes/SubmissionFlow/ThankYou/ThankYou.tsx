import React, { FC } from "react"
import {
  Button,
  Clickable,
  Flex,
  Text,
  Join,
  Spacer,
  Box,
} from "@artsy/palette"
import { FAQ } from "../../MarketingLanding/Components/FAQ"
import { SoldRecentlyQueryRenderer } from "../../MarketingLanding/Components/SoldRecently"
import { useRouter } from "v2/System/Router/useRouter"

export const ThankYou: FC = () => {
  const { router } = useRouter()

  const submitAnotherWork = () => {
    router.push({ pathname: "/consign/submission2" })
  }

  const goToArtsyHomePage = () => {
    router.push({ pathname: "/" })
  }

  return (
    <>
      <Text variant="xxl" mt={4}>
        Thank you for submitting a work
      </Text>
      <Box maxWidth="720px" mt={4}>
        <Text variant="lg">
          We’ll email you within 1–3 business days to let you know the status of
          your submission.
        </Text>
        <Text variant="lg" mt={2}>
          In the meantime, feel free to submit another work—and benefit from
          Artsy’s low fees, informed pricing, and multiple selling options.
        </Text>
      </Box>

      <Flex py={[2, 4]} mt={4}>
        <Button
          data-test-id="submit-another-work"
          size="medium"
          variant="primaryBlack"
          onClick={submitAnotherWork}
        >
          Submit Another Work
        </Button>
        <Clickable
          ml={150}
          onClick={goToArtsyHomePage}
          data-test-id="go-to-artsy-homepage"
        >
          <Text variant="xs">
            <u>Back to Artsy Homepage</u>
          </Text>
        </Clickable>
      </Flex>

      <Join separator={<Spacer mt={6} />}>
        <SoldRecentlyQueryRenderer />
        <FAQ />
      </Join>
    </>
  )
}
