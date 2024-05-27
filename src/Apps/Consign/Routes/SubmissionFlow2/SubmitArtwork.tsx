import { Button, Flex, Join, Text } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

const SECTIONS = [
  {
    title: "Tell us about your work",
    description:
      "Start by adding an artist from our list of high demand artists. Include information such as year, medium, dimensions and materials.",
    // image: require("images/submit_artwork_tell_us_about_your_work.webp"),
  },
  {
    title: "Upload artwork images",
    description:
      "Improve your chances of selling by including photographs of the front, back, frame, signature and other details.",
    // image: require("images/submit_artwork_upload_artwork_image.webp"),
  },
  {
    title: "Complete submission",
    description:
      "Your work will be submitted to an Artsy advisor who will assess whether your work is eligible and help guide you on next steps.",
    // image: require("images/submit_artwork_complete_submission.webp"),
  },
]

export const SubmitArtwork: React.FC = () => {
  return (
    <Flex width="100%" height="100%" m={4}>
      <Flex flexDirection="column" width={600} m="auto">
        <Text variant="xl" mb={4}>
          It’s easy to sell on Artsy
        </Text>

        <Flex flexDirection="column" mb={4}>
          <Join
            separator={
              <Flex py={2}>
                <Flex
                  borderBottom="1px solid"
                  borderColor="black10"
                  width="100%"
                />
              </Flex>
            }
          >
            {SECTIONS.map((section, index) => (
              <Flex key={index}>
                <Text
                  variant="lg-display"
                  fontWeight={500}
                  style={{ width: 25 }}
                >
                  {index + 1}
                </Text>

                <Flex flex={1} flexDirection="column">
                  <Text variant="lg-display" fontWeight={500}>
                    {section.title}
                  </Text>
                  <Text variant="sm" color="black60">
                    {section.description}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Join>
        </Flex>

        <Flex width="100%" justifyContent="space-between">
          <Button
            variant="secondaryNeutral"
            // @ts-ignore
            as={RouterLink}
            to="/sell/submissions/new"
            width="100%"
            mr={2}
          >
            Start from My Collection
          </Button>
          <Button
            variant="primaryBlack"
            // @ts-ignore
            as={RouterLink}
            to="/sell/submissions/new"
            width="100%"
          >
            Start New Submission
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
