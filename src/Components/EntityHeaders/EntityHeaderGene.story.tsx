import { graphql } from "react-relay"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  EntityHeaderGeneFragmentContainer,
  EntityHeaderGeneProps,
} from "./EntityHeaderGene"
import { EntityHeaderPlaceholder } from "./EntityHeaderPlaceholder"
import { EntityHeaderGeneStoryQuery } from "__generated__/EntityHeaderGeneStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const EntityHeaderGene = () => {
  return (
    <States<{ id: string } & Partial<Omit<EntityHeaderGeneProps, "gene">>>
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
          <SystemQueryRenderer<EntityHeaderGeneStoryQuery>
            variables={{ id }}
            placeholder={<EntityHeaderPlaceholder />}
            query={graphql`
              query EntityHeaderGeneStoryQuery($id: String!) {
                gene(id: $id) {
                  ...EntityHeaderGene_gene
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.gene) {
                return <EntityHeaderPlaceholder />
              }

              return (
                <EntityHeaderGeneFragmentContainer
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

EntityHeaderGene.story = {
  name: "EntityHeaderGene",
}
