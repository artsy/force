import { graphql } from "react-relay"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  EntityHeaderFairFragmentContainer,
  EntityHeaderFairProps,
} from "./EntityHeaderFair"
import { EntityHeaderPlaceholder } from "./EntityHeaderPlaceholder"
import { EntityHeaderFairStoryQuery } from "__generated__/EntityHeaderFairStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const EntityHeaderFair = () => {
  return (
    <States<{ id: string } & Partial<Omit<EntityHeaderFairProps, "fair">>>
      states={[
        { id: "liste-art-fair-basel-2021" },
        { id: "untitled-art-miami-beach-2021" },
        {
          id: "palm-beach-modern-plus-contemporary-art-wynwood-2021",
          displayLink: false,
        },
        { id: "the-armory-show-2021", displayAvatar: false },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<EntityHeaderFairStoryQuery>
            variables={{ id }}
            placeholder={<EntityHeaderPlaceholder />}
            query={graphql`
              query EntityHeaderFairStoryQuery($id: String!) {
                fair(id: $id) {
                  ...EntityHeaderFair_fair
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.fair) {
                return <EntityHeaderPlaceholder />
              }

              return (
                <EntityHeaderFairFragmentContainer
                  fair={props.fair}
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

EntityHeaderFair.story = {
  name: "EntityHeaderFair",
}
