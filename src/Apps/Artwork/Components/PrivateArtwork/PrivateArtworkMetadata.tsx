import { graphql, useFragment } from "react-relay"
import { PrivateArtworkMetadata_artwork$key } from "__generated__/PrivateArtworkMetadata_artwork.graphql"
import {
  Box,
  Column,
  GridColumns,
  HTML,
  ReadMore,
  Spacer,
  Text,
} from "@artsy/palette"

interface PrivateArtworkMetadataProps {
  artwork: PrivateArtworkMetadata_artwork$key
}

export const PrivateArtworkMetadata: React.FC<PrivateArtworkMetadataProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkMetadata_artwork on Artwork {
        title
      }
    `,
    artwork
  )

  // TODO: remove (typechecker)
  console.log(data)

  return (
    <GridColumns>
      <Column span={4}>
        <MetadataDetailItem title="Condition">
          <HTML variant="sm">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              lacinia elit non lacus vestibulum, eu imperdiet sapien maximus.
              Cras vehicula nisl et mollis consequat.
            </p>

            <p>
              Phasellus arcu purus, faucibus eu urna ac, tempor interdum justo.
              Interdum et malesuada fames ac ante ipsum primis in faucibus
            </p>
          </HTML>
        </MetadataDetailItem>
      </Column>

      <Column span={4}>
        <MetadataDetailItem title="Provenance">
          <HTML variant="sm">
            <ReadMore
              inlineReadMoreLink={false}
              content={`
                  <p>Creation: Untitled_0258 was painted by Davide Balliano in 2021 while he was in Saint-Rémy-de-Provence, France.</p>
                  <p>Initial Ownership: The painting became the property of his brother Theo Lorem Ipsum in 2022. Lorem Ipsum passed away shortly afterward.</p>
                  <p>Legacy: Following the death of Lorem Ipsum, the painting changed hands within the family and eventually was owned by Lorem Ipsum’s widow</p>
                  <p>This work was acquired directly from the artist by the present owner.</p>
                `}
              maxChars={200}
            />
          </HTML>
        </MetadataDetailItem>
      </Column>

      <Column span={4}>
        <MetadataDetailItem title="Exhibition History">
          <HTML variant="sm">
            <ReadMore
              inlineReadMoreLink={false}
              content={`
                <p>Genesis (2018): Untitled_0258 debuted in a local gallery, marking Balliano's exploration of physical and emotional journeys.</p>
                <p>Urban Narratives (2019): Featured in a city exhibition, the artwork's blend of urban elements and human experiences drew attention from critics.</p>
                <p>International Biennale (2020): Selected for a prestigious international biennale themed "Crossroads: Intersections of Culture and Change," earning global recognition.</p>
              `}
              maxChars={200}
            />
          </HTML>
        </MetadataDetailItem>
      </Column>
    </GridColumns>
  )
}

interface MetadataDetailItemProps {
  title: string
  children: React.ReactNode
}

const MetadataDetailItem: React.FC<MetadataDetailItemProps> = ({
  title,
  children,
}) => {
  return (
    <Box>
      <Text variant="sm" fontWeight="bold">
        {title}
      </Text>

      <Spacer y={2} />

      {children}
    </Box>
  )
}
