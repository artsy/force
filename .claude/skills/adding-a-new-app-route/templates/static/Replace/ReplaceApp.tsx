import { Box, Spacer, Text } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"

export const ReplaceApp: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <MetaTags
        title="Replace | Artsy"
        description="A description of this page"
        imageURL="https://files.artsy.net/images/exhibytes-718x212.png"
        pathname="/replace"
      />

      <Box mt={4}>
        <Text as="h1" variant={"xl"}>
          Static page
        </Text>

        <Spacer y={2} />

        <Text>Welcome to your new page with static-only content.</Text>

        <Spacer y={2} />

        <Text>Some follow-ups:</Text>

        <Spacer y={2} />

        <Text>• Replace this placeholder content</Text>
        <Text>• Update the metadata component &lt;MetaTags /&gt;</Text>
        <Text>• Consider analytics needs</Text>
        <Text>• Consider updating the sitemap</Text>
        <Text>• Consider a smoke test in Force or Integrity</Text>
        <Text>• See src/Apps/Example for a demonstration of more patterns</Text>
      </Box>
    </>
  )
}
