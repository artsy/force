import * as React from "react"
import { Box, BoxProps, HTML, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureSetMeta_set$data } from "__generated__/FeatureSetMeta_set.graphql"

export interface FeatureSetMetaProps extends BoxProps {
  set: FeatureSetMeta_set$data
}

export const FeatureSetMeta: React.FC<FeatureSetMetaProps> = ({
  set,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Join separator={<Spacer y={4} />}>
        {set.name && <Text variant={["lg-display", "xl"]}>{set.name}</Text>}

        {set.description && (
          <HTML variant="sm" color="black60" html={set.description} />
        )}
      </Join>
    </Box>
  )
}

export const FeatureSetMetaFragmentContainer = createFragmentContainer(
  FeatureSetMeta,
  {
    set: graphql`
      fragment FeatureSetMeta_set on OrderedSet {
        name
        description(format: HTML)
      }
    `,
  }
)
