import { FC, useEffect } from "react"
import { Box, Spacer, Text } from "@artsy/palette"
import { useTransition } from "Utils/Hooks/useTransition"
import { wait } from "Utils/wait"
import styled from "styled-components"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { graphql } from "react-relay"
import { RetrospectiveTopArtistsQuery } from "__generated__/RetrospectiveTopArtistsQuery.graphql"
import { RetrospectiveData } from "./useRetrospectiveData"

interface RetrospectiveTopArtistsProps {
  data: RetrospectiveData
  onEnd: () => void
}

export const RetrospectiveTopArtists: FC<RetrospectiveTopArtistsProps> = ({
  data: { topArtists },
}) => {
  const { data, loading } = useClientQuery<RetrospectiveTopArtistsQuery>({
    query: graphql`
      query RetrospectiveTopArtistsQuery($ids: [String!]!) {
        artists(slugs: $ids) {
          slug
          name
        }
      }
    `,
    variables: {
      ids: topArtists.map(([id]) => id),
    },
  })

  const maxCount = Math.max(...topArtists.map(([_, count]) => count))
  const percentages = topArtists.map(([_, count]) => (count / maxCount) * 100)

  const { transition, register } = useTransition({
    initialStatus: "Out",
    duration: 1000,
  })

  useEffect(() => {
    const init = async () => {
      if (loading) return
      await wait(500)
      transition("In")
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <Box
      maxWidth={700}
      m="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      pb={6}
    >
      <Title ref={register(0)} variant="xxl" data-state="Out" width="100%">
        Your Top Artists
      </Title>

      <Spacer y={6} />

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        style={{ gap: 20 }}
      >
        {topArtists.map(([slug, count], i) => {
          const percentage = percentages[i]
          const artist = data?.artists?.find(a => a?.slug === slug)

          if (!artist) return null

          return (
            <Element ref={register(i + 1)} key={i} data-state="Out">
              <Count key={slug} variant="sm-display" color="black60">
                {count} works
              </Count>

              <Spacer y={0.5} />

              <Box height={5} overflow="hidden" width={`${percentage}%`}>
                <Bar height="100%" bg="blue150" />
              </Box>

              <Spacer y={1} />

              <Text key={slug} variant="xxl">
                {artist.name}
              </Text>
            </Element>
          )
        })}
      </Box>
    </Box>
  )
}

const Title = styled(Text)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="In"] {
    opacity: 1;
    transform: translateX(0);
  }

  &[data-state="Out"] {
    opacity: 0;
    transform: translateX(-1em);
  }
`

const Count = styled(Text)`
  transition: transform 1000ms;
`

const Bar = styled(Box)`
  transition: transform 1000ms;
`

const Element = styled(Box)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="In"] {
    opacity: 1;
    transform: translateY(0);

    ${Count} {
      transform: translateX(0);
    }

    ${Bar} {
      transform: translateX(0);
    }
  }

  &[data-state="Out"] {
    opacity: 0;
    transform: translateY(1em);

    ${Count} {
      transform: translateX(-1em);
    }

    ${Bar} {
      transform: translateX(-100%);
    }
  }
`
