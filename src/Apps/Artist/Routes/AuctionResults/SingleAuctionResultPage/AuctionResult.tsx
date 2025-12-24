import { ContextModule, Intent } from "@artsy/cohesion"
import { Column, GridColumns, Join, Spacer, Text } from "@artsy/palette"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { AuctionResultImage } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultImage"
import { AuctionResultMetaData } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultMetaData"
import { AuctionResultPrice } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultPrice"
import { AuctionResultTitleInfo } from "Apps/Artist/Routes/AuctionResults/SingleAuctionResultPage/AuctionResultTitleInfo"
import { useAuthDialog } from "Components/AuthDialog"
import { MetaTags } from "Components/MetaTags"
import { TopContextBar } from "Components/TopContextBar"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { extractNodes } from "Utils/extractNodes"
import type { AuctionResult_auctionResult$data } from "__generated__/AuctionResult_auctionResult.graphql"
import { useEffect, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface AuctionResultProps {
  auctionResult: AuctionResult_auctionResult$data
}

export const AuctionResult: React.FC<
  React.PropsWithChildren<AuctionResultProps>
> = ({ auctionResult }) => {
  const { comparableAuctionResults, title, artist, internalID } = auctionResult
  const { user } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()

  const results = extractNodes(comparableAuctionResults)

  if (!artist) return null

  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) return
    if (!artist) return

    isMounted.current = true

    if (!user) {
      showAuthDialog({
        options: {
          isCloseable: false,
          title: `Sign up or log in to see auction results for ${artist.name}`,
          image: {
            url: artist.coverArtwork?.image?.url,
          },
        },
        analytics: {
          contextModule: ContextModule.auctionResults,
          intent: Intent.viewAuctionResults,
        },
      })
    }
  }, [artist, user, showAuthDialog])

  return (
    <>
      <MetaTags
        title={`${title}${
          artist.name ? ` by ${artist.name}` : ""
        } | Auction Results on Artsy`}
        pathname={`/auction-result/${internalID}`}
      />

      <TopContextBar displayBackArrow href={`${artist.href}/auction-results`}>
        {artist.name} Auction Results
      </TopContextBar>

      <GridColumns mt={[0, 2]}>
        <Column span={4}>
          <AuctionResultImage auctionResult={auctionResult} />
        </Column>

        <Column span={8}>
          <Join separator={<Spacer y={[2, 4]} />}>
            <AuctionResultTitleInfo auctionResult={auctionResult} />

            <AuctionResultPrice auctionResult={auctionResult} />

            <AuctionResultMetaData auctionResult={auctionResult} />
          </Join>
        </Column>
      </GridColumns>

      <Spacer y={[4, 6]} />

      {!!results.length && (
        <>
          <Text variant={["sm-display", "md"]}>Comparable Works</Text>

          <Spacer y={[2, 4]} />

          <Join separator={<Spacer y={2} />}>
            {results.map((result, index) => {
              return (
                <ArtistAuctionResultItemFragmentContainer
                  key={index}
                  auctionResult={result}
                  filtersAtDefault={false}
                />
              )
            })}
          </Join>
        </>
      )}
    </>
  )
}

export const AuctionResultFragmentContainer = createFragmentContainer(
  AuctionResult,
  {
    auctionResult: graphql`
      fragment AuctionResult_auctionResult on AuctionResult {
        internalID
        artist {
          name
          href
          coverArtwork {
            image {
              url(version: "x-large")
              aspectRatio
            }
          }
        }
        title
        comparableAuctionResults(first: 6) @optionalField {
          edges {
            cursor
            node {
              ...ArtistAuctionResultItem_auctionResult
            }
          }
        }
        ...AuctionResultImage_auctionResult
        ...AuctionResultMetaData_auctionResult
        ...AuctionResultPrice_auctionResult
        ...AuctionResultTitleInfo_auctionResult
      }
    `,
  },
)
