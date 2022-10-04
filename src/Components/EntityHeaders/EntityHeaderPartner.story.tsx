import { graphql } from "react-relay"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  EntityHeaderPartnerFragmentContainer,
  EntityHeaderPartnerProps,
} from "./EntityHeaderPartner"
import { EntityHeaderPlaceholder } from "./EntityHeaderPlaceholder"
import { EntityHeaderPartnerStoryQuery } from "__generated__/EntityHeaderPartnerStoryQuery.graphql"

export default {
  title: "Components/EntityHeader",
}

export const EntityHeaderPartner = () => {
  return (
    <States<{ id: string } & Partial<Omit<EntityHeaderPartnerProps, "partner">>>
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
          <SystemQueryRenderer<EntityHeaderPartnerStoryQuery>
            variables={{ id }}
            placeholder={<EntityHeaderPlaceholder />}
            query={graphql`
              query EntityHeaderPartnerStoryQuery($id: String!) {
                partner(id: $id) {
                  ...EntityHeaderPartner_partner
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.partner) {
                return <EntityHeaderPlaceholder />
              }

              return (
                <EntityHeaderPartnerFragmentContainer
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

EntityHeaderPartner.story = {
  name: "EntityHeaderPartner",
}
