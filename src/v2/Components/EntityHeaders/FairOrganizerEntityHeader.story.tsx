import { graphql } from "relay-runtime"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  FairOrganizerEntityHeaderFragmentContainer,
  FairOrganizerEntityHeaderProps,
} from "./FairOrganizerEntityHeader"
import { PlaceholderEntityHeader } from "./PlaceholderEntityHeader"
import { FairOrganizerEntityHeaderStoryQuery } from "v2/__generated__/FairOrganizerEntityHeaderStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const FairOrganizerEntityHeader = () => {
  return (
    <States<
      { id: string } & Partial<
        Omit<FairOrganizerEntityHeaderProps, "fairOrganizer">
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
          <SystemQueryRenderer<FairOrganizerEntityHeaderStoryQuery>
            variables={{ id }}
            placeholder={<PlaceholderEntityHeader />}
            query={graphql`
              query FairOrganizerEntityHeaderStoryQuery($id: String!) {
                fairOrganizer(id: $id) {
                  ...FairOrganizerEntityHeader_fairOrganizer
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.fairOrganizer) {
                return <PlaceholderEntityHeader />
              }

              return (
                <FairOrganizerEntityHeaderFragmentContainer
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

FairOrganizerEntityHeader.story = {
  name: "FairOrganizerEntityHeader",
}
