import { graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { CellSaleStoryQuery } from "__generated__/CellSaleStoryQuery.graphql"
import { CellSaleFragmentContainer, CellSalePlaceholder } from "./CellSale"

export default {
  title: "Components/Cell",
}

export const CellSale = () => {
  return (
    <SystemQueryRenderer<CellSaleStoryQuery>
      placeholder={<CellSalePlaceholder />}
      query={graphql`
        query CellSaleStoryQuery {
          viewer {
            salesConnection(
              first: 99
              published: true
              live: true
              sort: LICENSED_TIMELY_AT_NAME_DESC
            ) {
              edges {
                node {
                  ...CellSale_sale
                }
              }
            }
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.viewer?.salesConnection) {
          return <CellSalePlaceholder />
        }

        return (
          <CellSaleFragmentContainer
            sale={props.viewer?.salesConnection?.edges?.[0]?.node!}
          />
        )
      }}
    />
  )
}

CellSale.story = {
  name: "CellSale",
}
