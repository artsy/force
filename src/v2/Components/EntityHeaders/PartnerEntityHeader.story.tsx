import { graphql } from "relay-runtime"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  PartnerEntityHeaderFragmentContainer,
  PartnerEntityHeaderProps,
} from "./PartnerEntityHeader"
import { PlaceholderEntityHeader } from "./PlaceholderEntityHeader"
import { PartnerEntityHeaderStoryQuery } from "v2/__generated__/PartnerEntityHeaderStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const PartnerEntityHeader = () => {
  return (
    <States<{ id: string } & Partial<Omit<PartnerEntityHeaderProps, "partner">>>
      states={[
        { id: "gagosian" },
        { id: "jtt-gallery" },
        { id: "dada-gallery" },
        { id: "lehmann-maupin" },
        { id: "gagosian", FollowButton: <></> },
        { id: "gagosian", displayAvatar: false },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<PartnerEntityHeaderStoryQuery>
            variables={{ id }}
            placeholder={<PlaceholderEntityHeader />}
            query={graphql`
              query PartnerEntityHeaderStoryQuery($id: String!) {
                partner(id: $id) {
                  ...PartnerEntityHeader_partner
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.partner) {
                return <PlaceholderEntityHeader />
              }

              return (
                <PartnerEntityHeaderFragmentContainer
                  partner={props.partner}
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

PartnerEntityHeader.story = {
  name: "PartnerEntityHeader",
}
