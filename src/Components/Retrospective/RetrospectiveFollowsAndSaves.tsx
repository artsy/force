import { Box, Spacer, Spinner } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RetrospectiveFollowsAndSaves_collection$data } from "__generated__/RetrospectiveFollowsAndSaves_collection.graphql"
import { RetrospectiveFollowsAndSavesQuery } from "__generated__/RetrospectiveFollowsAndSavesQuery.graphql"
import { useRetrospectiveData } from "Components/Retrospective/useRetrospectiveData"
import { RetrospectiveProgressBar } from "Components/Retrospective/RetrospectiveProgressBar"
import { RetrospectiveTopArtists } from "Components/Retrospective/RetrospectiveTopArtists"
import { RetrospectiveTopArtist } from "Components/Retrospective/RetrospectiveTopArtist"
import { RetrospectiveTopGenes } from "Components/Retrospective/RetrospectiveTopGenes"
import { RetrospectiveYourArtTaste } from "Components/Retrospective/RetrospectiveYourArtTaste"
import { useMode } from "Utils/Hooks/useMode"
import { RetrospectiveBegin } from "Components/Retrospective/RetrospectiveBegin"
import { useEffect, useState } from "react"

interface RetrospectiveFollowsAndSavesProps {
  me: RetrospectiveFollowsAndSaves_collection$data
}

export const RetrospectiveFollowsAndSaves: React.FC<RetrospectiveFollowsAndSavesProps> = ({
  me,
}) => {
  const [mode, setMode] = useMode<"Pending" | "Playing">("Pending")
  const [renders, setRenders] = useState(0)

  useEffect(() => {
    document.body.style.transition = "background-color 500ms"

    return () => {
      document.body.style.transition = ""
    }
  }, [])

  const data = useRetrospectiveData({ me })

  const sections = {
    TOP_ARTIST: {
      Component: RetrospectiveTopArtist,
    },
    TOP_ARTISTS: {
      Component: RetrospectiveTopArtists,
    },
    TOP_GENES: {
      Component: RetrospectiveTopGenes,
    },
    YOUR_ART_TASTE: {
      Component: RetrospectiveYourArtTaste,
    },
  } as const

  const keys = Object.keys(sections)

  const [index, setIndex] = useState(0)

  const handleNext = () => {
    if (index === keys.length - 1) {
      return
    }

    setIndex(prevIndex => prevIndex + 1)
  }

  const handleReset = () => {
    setIndex(0)
    setMode("Playing")
    setRenders(prevRenders => prevRenders + 1)
  }

  const key = keys[index]

  const { Component } = sections[key as keyof typeof sections]

  if (mode === "Pending") {
    return (
      <RetrospectiveBegin
        onStart={() => {
          setMode("Playing")
        }}
      />
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      position="fixed"
      top={0}
      left={0}
    >
      <Box
        key={renders}
        display="flex"
        style={{ gap: 10 }}
        px={2}
        pt={2}
        pb={6}
        background="linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);"
      >
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

      <Box p={2} flex={1}>
        <Component data={data} onEnd={handleReset} />
      </Box>
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
                  slug
                }
                id
                attributionClass {
                  internalID
                  name
                }
                mediumType {
                  filterGene {
                    name
                    internalID
                  }
                }
              }
            }
          }
          artistsConnection(first: 100) {
            edges {
              node {
                artist {
                  slug
                  genes {
                    name
                    slug
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
