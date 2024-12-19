import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { CellPartnerStoryQuery } from "__generated__/CellPartnerStoryQuery.graphql"
import { graphql } from "react-relay"
import { States } from "storybook-states"
import {
  CellPartnerFragmentContainer,
  CellPartnerPlaceholder,
  type CellPartnerProps,
} from "./CellPartner"

export default {
  title: "Components/Cell",
}

export const CellPartner = () => {
  return (
    <States<{ id: string } & Partial<Omit<CellPartnerProps, "partner">>>
      states={[
        { id: "gagosian" },
        { id: "gagosian", mode: "GRID" },
        {
          id: "jtt-gallery",
        },
        { id: "jtt-gallery", mode: "GRID" },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<CellPartnerStoryQuery>
            variables={{ id }}
            placeholder={<CellPartnerPlaceholder {...rest} />}
            query={graphql`
              query CellPartnerStoryQuery($id: String!) {
                partner(id: $id) {
                  ...CellPartner_partner
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.partner) {
                return <CellPartnerPlaceholder {...rest} />
              }

              return (
                <CellPartnerFragmentContainer
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

CellPartner.story = {
  name: "CellPartner",
}
