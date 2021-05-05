import { Column, GridColumns, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ExampleArtworkFilterRoute_tag } from "v2/__generated__/ExampleArtworkFilterRoute_tag.graphql"
import { ExampleArtworkFilterRefetchContainer } from "./Components/ExampleArtworkFilter"

interface ExampleArtworkFilterProps {
  tag: ExampleArtworkFilterRoute_tag
}

const ExampleArtworkFilterRoute: React.FC<ExampleArtworkFilterProps> = ({
  tag,
}) => {
  return (
    <>
      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text as="h1" variant="xl" mb={2}>
            {tag.name}
          </Text>
        </Column>
      </GridColumns>

      <ExampleArtworkFilterRefetchContainer tag={tag} />
    </>
  )
}

export const ExampleArtworkFilterFragmentContainer = createFragmentContainer(
  ExampleArtworkFilterRoute,
  {
    tag: graphql`
      fragment ExampleArtworkFilterRoute_tag on Tag
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        ...ExampleArtworkFilter_tag @arguments(input: $input)
        name
      }
    `,
  }
)
