import { Button, Flex, Text } from "@artsy/palette"
import { useSystemContext } from "System"
import { RouterLink } from "System/Router/RouterLink"

export const ThankYou: React.FC = () => {
  const { isLoggedIn } = useSystemContext()

  return (
    <>
      <Text variant="xl" mt={4}>
        Your artwork has been submitted
      </Text>
      <Text variant="md" color="black60" mt={1} mb={[4, 6]}>
        We will email you within 1-3 days to confirm if your artwork has been
        accepted or not.
      </Text>

      <Flex
        flexDirection={["column", "row"]}
        alignItems={["stretch", "center"]}
      >
        {isLoggedIn ? (
          <RouterLink to="/my-collection">
            <Button
              width={["100%", "auto"]}
              data-test-id="back-to-my-collection"
              size="large"
              variant="primaryBlack"
            >
              Back to My Collection
            </Button>
          </RouterLink>
        ) : (
          <RouterLink to="/">
            <Button
              width={["100%", "auto"]}
              data-test-id="back-to-artsy-homepage"
              size="large"
              variant="primaryBlack"
            >
              Back to Artsy Homepage
            </Button>
          </RouterLink>
        )}
      </Flex>
    </>
  )
}
