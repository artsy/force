import { graphql } from "react-relay"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  CellShowFragmentContainer,
  CellShowProps,
  CellShowPlaceholder,
} from "./CellShow"
import { CellShowStoryQuery } from "__generated__/CellShowStoryQuery.graphql"

export default {
  title: "Components/Cell",
}

export const CellShow = () => {
  return (
    <States<{ id: string } & Partial<Omit<CellShowProps, "show">>>
      states={[
        { id: "whitney-museum-of-american-art-1-whitney-biennial-2019-1" },
        {
          id: "whitney-museum-of-american-art-1-whitney-biennial-2019-1",
          displayStatus: true,
        },
        {
          id: "whitney-museum-of-american-art-1-whitney-biennial-2019-1",
          displayKind: true,
        },
        {
          id: "whitney-museum-of-american-art-1-whitney-biennial-2019-1",
          displayPartner: false,
        },
        {
          id: "whitney-museum-of-american-art-1-whitney-biennial-2019-1",
          mode: "GRID",
        },
        {
          id: "whitney-museum-of-american-art-1-laura-owens",
        },
        { id: "whitney-museum-of-american-art-1-laura-owens", mode: "GRID" },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<CellShowStoryQuery>
            variables={{ id }}
            placeholder={<CellShowPlaceholder {...rest} />}
            query={graphql`
              query CellShowStoryQuery($id: String!) {
                show(id: $id) {
                  ...CellShow_show
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.show) {
                return <CellShowPlaceholder {...rest} />
              }

              return <CellShowFragmentContainer show={props.show} {...rest} />
            }}
          />
        )
      }}
    </States>
  )
}

CellShow.story = {
  name: "CellShow",
}
