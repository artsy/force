import { Box, HTML, Spacer, Stack, Text } from "@artsy/palette"
import { ReplaceMetaFragmentContainer } from "Apps/Replace/Components/ReplaceMeta"
import type { ReplaceApp_artist$data } from "__generated__/ReplaceApp_artist.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ReplaceAppProps {
  artist: ReplaceApp_artist$data
}

const ReplaceApp: React.FC<
  React.PropsWithChildren<ReplaceAppProps>
> = props => {
  const { artist } = props

  return (
    <>
      <ReplaceMetaFragmentContainer artist={artist} />

      <Box mt={4}>
        <Text as="h1" variant={"xl"}>
          Dynamic page
        </Text>

        <Spacer y={2} />

        <Text>
          Welcome to your new page with dynamic content fetched from
          Metaphysics.
        </Text>

        <Spacer y={2} />

        <Stack gap={1}>
          <Box>
            <Text as="h2" variant={"lg"}>
              {artist.name}
            </Text>
            <Text color="mono60" variant={"md"}>
              {artist.formattedNationalityAndBirthday}
            </Text>
          </Box>

          <HTML html={artist.biographyBlurb?.text || ""} />
        </Stack>

        <Spacer y={2} />

        <Text>Some follow-ups:</Text>

        <Spacer y={2} />

        <Text>• Replace this placeholder content</Text>
        <Text>• Replace the GraphQL query</Text>
        <Text>• Update the metadata component (see ReplaceMeta.tsx)</Text>
        <Text>• Update the generated tests</Text>
        <Text>• Consider caching & routing needs (see replaceRoutes.tsx)</Text>
        <Text>• Consider analytics needs</Text>
        <Text>• Consider updating the sitemap</Text>
        <Text>• Consider a smoke test in Force or Integrity</Text>
        <Text>• See src/Apps/Example for a demonstration of more patterns</Text>
      </Box>
    </>
  )
}

export const ReplaceAppFragmentContainer = createFragmentContainer(ReplaceApp, {
  artist: graphql`
    fragment ReplaceApp_artist on Artist {
      ...ReplaceMeta_artist
      name
      formattedNationalityAndBirthday
      biographyBlurb(format: HTML) {
        text
      }
    }
  `,
})
