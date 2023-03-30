import { Box, Image, Spacer, Text } from "@artsy/palette"
import { FC, useEffect } from "react"
import { graphql } from "react-relay"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useTransition } from "Utils/Hooks/useTransition"
import { RetrospectiveTopGenesQuery } from "__generated__/RetrospectiveTopGenesQuery.graphql"
import styled from "styled-components"
import { wait } from "Utils/wait"

interface RetrospectiveTopGenesProps {
  data: [string, number][]
}

export const RetrospectiveTopGenes: FC<RetrospectiveTopGenesProps> = ({
  data: datums,
}) => {
  const { data, loading } = useClientQuery<RetrospectiveTopGenesQuery>({
    query: graphql`
      query RetrospectiveTopGenesQuery($ids: [String!]!) {
        genes(slugs: $ids) {
          slug
          name
          image {
            cropped(
              width: 150
              height: 150
              version: ["big_and_tall", "square500", "tall"]
            ) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    `,
    variables: {
      ids: datums.map(([slug]) => slug),
    },
  })

  const { register, transition } = useTransition()

  useEffect(() => {
    document.body.style.backgroundColor = "#000"
    document.body.style.color = "#fff"

    return () => {
      document.body.style.backgroundColor = ""
      document.body.style.color = ""
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await wait(500)
      transition("In")
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return null

  const genes = data?.genes ?? []

  return (
    <Box
      width="fit-content"
      m="auto"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pb={6}
    >
      <Title ref={register(0)} variant="xxl" data-state="Out">
        Your Top Categories
      </Title>

      <Spacer y={4} />

      <Box display="flex" flexDirection="column" style={{ gap: 20 }}>
        {genes.map((gene, index) => {
          if (!gene) return null

          const img = gene.image?.cropped

          return (
            <Gene
              ref={register(index + 1)}
              key={index}
              display="flex"
              alignItems="center"
              data-state="Out"
            >
              {img && (
                <Box
                  width={img.width}
                  height={img.height}
                  borderRadius="50%"
                  overflow="hidden"
                >
                  <Image
                    src={img.src}
                    srcSet={img.srcSet}
                    width="100%"
                    height="100%"
                    lazyLoad
                    alt=""
                  />
                </Box>
              )}

              <Spacer x={2} />

              <Box>
                <Text variant="xl">{gene.name}</Text>
                <Text variant="xl" color="black60">
                  {datums[index][1]} saved artworks
                </Text>
              </Box>
            </Gene>
          )
        })}
      </Box>
    </Box>
  )
}

const Title = styled(Text)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="Out"] {
    opacity: 0;
    transform: translateY(-20px);
  }

  &[data-state="In"] {
    opacity: 1;
    transform: translateY(0);
  }
`

const Gene = styled(Box)`
  transition: opacity 500ms, transform 500ms;

  &[data-state="Out"] {
    opacity: 0;
    transform: translateX(-60px);
  }

  &[data-state="In"] {
    opacity: 1;
    transform: translateX(0);
  }

  &:nth-child(odd) {
    &[data-state="Out"] {
      transform: translateX(60px);
    }
  }
`
