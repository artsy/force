import { Column, GridColumns, Text } from "@artsy/palette"
import type { TagApp_tag$data } from "__generated__/TagApp_tag.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { TagArtworkFilterQueryRenderer } from "./Components/TagArtworkFilter"
import { TagMetaFragmentContainer } from "./Components/TagMeta"

interface TagAppProps {
  tag: TagApp_tag$data
}

const TagApp: React.FC<React.PropsWithChildren<TagAppProps>> = ({ tag }) => {
  return (
    <>
      <TagMetaFragmentContainer tag={tag} />

      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text as="h1" variant="xl" mb={2}>
            {tag.name}
          </Text>
        </Column>
      </GridColumns>

      <TagArtworkFilterQueryRenderer />
    </>
  )
}

export const TagAppFragmentContainer = createFragmentContainer(TagApp, {
  tag: graphql`
    fragment TagApp_tag on Tag {
      ...TagMeta_tag
      name
    }
  `,
})
