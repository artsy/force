import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { CellArtistSeriesStoryQuery } from "__generated__/CellArtistSeriesStoryQuery.graphql"
import { graphql } from "react-relay"
import { States } from "storybook-states"
import {
  CellArtistSeriesFragmentContainer,
  CellArtistSeriesPlaceholder,
  type CellArtistSeriesProps,
} from "./CellArtistSeries"

export default {
  title: "Components/Cell",
}

export const CellArtistSeries = () => {
  return (
    <States<
      { id: string } & Partial<Omit<CellArtistSeriesProps, "artistSeries">>
    >
      states={[
        { id: "gerhard-richter-abstractions" },
        { id: "alex-katz-ada" },
        { id: "takashi-murakami-flower-balls" },
        { id: "gerhard-richter-abstractions", mode: "GRID" },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<CellArtistSeriesStoryQuery>
            variables={{ id }}
            placeholder={<CellArtistSeriesPlaceholder {...rest} />}
            query={graphql`
              query CellArtistSeriesStoryQuery($id: ID!) {
                artistSeries(id: $id) {
                  ...CellArtistSeries_artistSeries
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.artistSeries) {
                return <CellArtistSeriesPlaceholder {...rest} />
              }

              return (
                <CellArtistSeriesFragmentContainer
                  artistSeries={props.artistSeries}
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

CellArtistSeries.story = {
  name: "CellArtistSeries",
}
