import { graphql } from "relay-runtime"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  GeneEntityHeaderFragmentContainer,
  GeneEntityHeaderProps,
} from "./GeneEntityHeader"
import { PlaceholderEntityHeader } from "./PlaceholderEntityHeader"
import { GeneEntityHeaderStoryQuery } from "v2/__generated__/GeneEntityHeaderStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const GeneEntityHeader = () => {
  return (
    <States<{ id: string } & Partial<Omit<GeneEntityHeaderProps, "gene">>>
      states={[
        { id: "painting" },
        { id: "globalization" },
        { id: "allegory" },
        { id: "shadows", displayAvatar: false },
        { id: "representations-of-architecture", displayLink: false },
        { id: "representations-of-architecture", FollowButton: <></> },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<GeneEntityHeaderStoryQuery>
            variables={{ id }}
            placeholder={<PlaceholderEntityHeader />}
            query={graphql`
              query GeneEntityHeaderStoryQuery($id: String!) {
                gene(id: $id) {
                  ...GeneEntityHeader_gene
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.gene) {
                return <PlaceholderEntityHeader />
              }

              return (
                <GeneEntityHeaderFragmentContainer
                  gene={props.gene}
                  {...rest}
                />
              )
            }}
          />
        )
      }}
    </States>
  )
}

GeneEntityHeader.story = {
  name: "GeneEntityHeader",
}
