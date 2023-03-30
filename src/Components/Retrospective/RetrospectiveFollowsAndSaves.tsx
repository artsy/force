import { Box, Spacer, Spinner } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RetrospectiveFollowsAndSaves_collection$data } from "__generated__/RetrospectiveFollowsAndSaves_collection.graphql"
import { RetrospectiveFollowsAndSavesQuery } from "__generated__/RetrospectiveFollowsAndSavesQuery.graphql"
import { useRetrospectiveData } from "Components/Retrospective/useRetrospectiveData"
import { RetrospectiveProgressBar } from "Components/Retrospective/RetrospectiveProgressBar"
import { useCursor } from "use-cursor"
import { RetrospectiveTopArtists } from "Components/Retrospective/RetrospectiveTopArtists"

interface RetrospectiveFollowsAndSavesProps {
  me: RetrospectiveFollowsAndSaves_collection$data
}

export const RetrospectiveFollowsAndSaves: React.FC<RetrospectiveFollowsAndSavesProps> = ({
  me,
}) => {
  const {
    topArtists,
    topGenes,
    topMediums,
    topRarities,
  } = useRetrospectiveData({ me })

  const sections = {
    TOP_ARTISTS: {
      data: topArtists,
      Component: RetrospectiveTopArtists,
    },
    TOP_GENES: {
      data: topGenes,
      Component: () => <>TODO</>,
    },
    TOP_MEDIUMS: {
      data: topMediums,
      Component: () => <>TODO</>,
    },
    TOP_RARITIES: {
      data: topRarities,
      Component: () => <>TODO</>,
    },
  } as const

  const keys = Object.keys(sections)

  const { index, handleNext } = useCursor({
    max: keys.length,
  })

  const key = keys[index]

  const { Component, data } = sections[key as keyof typeof sections]

  return (
    <Box width="100%" height="100%" position="fixed" top={0} left={0} p={2}>
      <Box display="flex" style={{ gap: 10 }}>
        {keys.map((key, i) => {
          return (
            <Box key={key} flex={1}>
              <RetrospectiveProgressBar
                active={i === index}
                onComplete={handleNext}
                duration={10000}
              />
            </Box>
          )
        })}
      </Box>

      <Spacer y={2} />

      {/* <pre>{JSON.stringify(sections[index], null, 2)}</pre> */}

      <Component data={data} />
    </Box>
  )
}

export const RetrospectiveFollowsAndSavesFragmentContainer = createFragmentContainer(
  RetrospectiveFollowsAndSaves,
  {
    me: graphql`
      fragment RetrospectiveFollowsAndSaves_collection on Me {
        followsAndSaves {
          artworksConnection(first: 100, page: 1, private: true) {
            totalCount
            edges {
              node {
                artist {
                  name
                }
                id
                attributionClass {
                  name
                }
                mediumType {
                  name
                }
              }
            }
          }
          artistsConnection(first: 100) {
            edges {
              node {
                artist {
                  name
                  genes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)

export const RetrospectiveFollowsAndSavesQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<RetrospectiveFollowsAndSavesQuery>
      query={graphql`
        query RetrospectiveFollowsAndSavesQuery {
          me {
            ...RetrospectiveFollowsAndSaves_collection
          }
        }
      `}
      placeholder={<Spinner />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.me) {
          return <Spinner />
        }

        return <RetrospectiveFollowsAndSavesFragmentContainer me={props.me} />
      }}
    />
  )
}
