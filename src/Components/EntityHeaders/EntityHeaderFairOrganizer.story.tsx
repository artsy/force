import { graphql } from "react-relay"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  EntityHeaderFairOrganizerFragmentContainer,
  EntityHeaderFairOrganizerProps,
} from "./EntityHeaderFairOrganizer"
import { EntityHeaderPlaceholder } from "./EntityHeaderPlaceholder"
import { EntityHeaderFairOrganizerStoryQuery } from "__generated__/EntityHeaderFairOrganizerStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const EntityHeaderFairOrganizer = () => {
  return (
    <States<
      { id: string } & Partial<
        Omit<EntityHeaderFairOrganizerProps, "fairOrganizer">
      >
    >
      states={[
        { id: "liste" },
        { id: "untitled-art" },
        { id: "the-armory-show" },
        { id: "liste", displayAvatar: false },
        { id: "artissima", displayLink: false },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<EntityHeaderFairOrganizerStoryQuery>
            variables={{ id }}
            placeholder={<EntityHeaderPlaceholder />}
            query={graphql`
              query EntityHeaderFairOrganizerStoryQuery($id: String!) {
                fairOrganizer(id: $id) {
                  ...EntityHeaderFairOrganizer_fairOrganizer
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.fairOrganizer) {
                return <EntityHeaderPlaceholder />
              }

              return (
                <EntityHeaderFairOrganizerFragmentContainer
                  fairOrganizer={props.fairOrganizer}
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

EntityHeaderFairOrganizer.story = {
  name: "EntityHeaderFairOrganizer",
}
