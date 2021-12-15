import { Button, Flex, Text, Spacer, Box } from "@artsy/palette"
import { FAQ } from "../../MarketingLanding/Components/FAQ"
import { SoldRecentlyQueryRenderer } from "../../MarketingLanding/Components/SoldRecently"
import { RouterLink } from "v2/System/Router/RouterLink"

export const ThankYou: React.FC = () => {
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

      <Flex
        py={2}
        my={4}
        flexDirection={["column", "row"]}
        alignItems={["stretch", "center"]}
      >
        <RouterLink to="/consign/submission/artwork-details">
          <Button
            mr={[0, 150]}
            width={["100%", "auto"]}
            data-test-id="submit-another-work"
            size="medium"
            variant="primaryBlack"
          >
            Submit Another Work
          </Button>
        </RouterLink>

        <RouterLink to="/">
          <Button
            mt={[4, 0]}
            width={["100%", "auto"]}
            data-test-id="go-to-artsy-homepage"
            size="medium"
            variant="noOutline"
          >
            Back to Artsy Homepage
          </Button>
        </RouterLink>
      </Flex>

      <SoldRecentlyQueryRenderer />
      <Spacer mt={6} />
      <FAQ />
    </>
  )
}
