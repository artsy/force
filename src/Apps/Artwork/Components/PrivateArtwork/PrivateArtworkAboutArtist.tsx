import { graphql, useFragment } from "react-relay"
import { PrivateArtworkAboutArtist_artwork$key } from "__generated__/PrivateArtworkAboutArtist_artwork.graphql"
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  ReadMore,
  HTML,
  Spacer,
} from "@artsy/palette"

interface PrivateArtworkAboutArtistProps {
  artwork: PrivateArtworkAboutArtist_artwork$key
}

export const PrivateArtworkAboutArtist: React.FC<PrivateArtworkAboutArtistProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkAboutArtist_artwork on Artwork {
        title
      }
    `,
    artwork
  )

  // FIXME: Remove (typechecker)
  console.log(data)

  return (
    <Box minHeight={275} width="100%" p={6}>
      <Flex justifyContent="center">
        <Flex width={680}>
          <Box pr={4}>
            <Image src="https://picsum.photos/175/225" />
          </Box>
          <Box>
            <Text variant="xs" textTransform="uppercase">
              About the Artist
            </Text>

            <Spacer y={2} />

            <Text variant="lg">Davide Balliano</Text>

            <Spacer y={1} />

            <Button variant="secondaryWhite" size="small">
              Follow
            </Button>

            <Spacer y={1} />

            <HTML variant="sm">
              <ReadMore
                maxChars={190}
                content="Davide Balliano’s research operates on the thin line of demarcation between painting and sculpture. Utilizing an austere, minimal language of abstract geometries in strong dialogue with architecture, his work"
              />
            </HTML>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
