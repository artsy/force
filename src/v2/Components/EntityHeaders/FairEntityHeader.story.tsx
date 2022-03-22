import { graphql } from "relay-runtime"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  FairEntityHeaderFragmentContainer,
  FairEntityHeaderProps,
} from "./FairEntityHeader"
import { PlaceholderEntityHeader } from "./PlaceholderEntityHeader"
import { FairEntityHeaderStoryQuery } from "v2/__generated__/FairEntityHeaderStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const FairEntityHeader = () => {
  return (
    <States<{ id: string } & Partial<Omit<FairEntityHeaderProps, "fair">>>
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
          <SystemQueryRenderer<FairEntityHeaderStoryQuery>
            variables={{ id }}
            placeholder={<PlaceholderEntityHeader />}
            query={graphql`
              query FairEntityHeaderStoryQuery($id: String!) {
                fair(id: $id) {
                  ...FairEntityHeader_fair
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.fair) {
                return <PlaceholderEntityHeader />
              }

              return (
                <FairEntityHeaderFragmentContainer
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

FairEntityHeader.story = {
  name: "FairEntityHeader",
}
