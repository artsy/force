import { Box, HTML, ReadMore, Spacer, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { PrivateArtworkAboutWork_artwork$key } from "__generated__/PrivateArtworkAboutWork_artwork.graphql"

interface PrivateArtworkAboutWorkProps {
  artwork: PrivateArtworkAboutWork_artwork$key
}

export const PrivateArtworkAboutWork: React.FC<PrivateArtworkAboutWorkProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkAboutWork_artwork on Artwork {
        title
      }
    `,
    artwork
  )

  // FIXME: Remove (typechecker)
  console.log(data)

  return (
    <Box textAlign="center">
      <Text variant="sm" textTransform="uppercase">
        About this work
      </Text>

      <Spacer y={2} />

      <HTML variant="lg">
        <ReadMore
          inlineReadMoreLink={false}
          content={
            "Through a practice that is self-described as monastic, austere and concrete, Balliano’s meticulous paintings appear, upon first glance, clean and precise. However, closer inspection reveals scrapes and scratches that uncover the organic wooden surface underneath the layers of paint, as a decaying façade of modernistic intentions"
          }
          maxChars={200}
        />
      </HTML>
    </Box>
  )
}
