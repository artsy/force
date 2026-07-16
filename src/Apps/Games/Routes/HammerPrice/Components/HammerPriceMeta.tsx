import { getPuzzleNumber } from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"
import { MetaTags } from "Components/MetaTags"
import type { HammerPriceMeta_auctionResult$key } from "__generated__/HammerPriceMeta_auctionResult.graphql"
import { graphql, useFragment } from "react-relay"

export interface HammerPriceMetaProps {
  auctionResult: HammerPriceMeta_auctionResult$key
}

/**
 * Meta tags for a puzzle. The artwork title and image are not spoilers — the
 * hidden answer is the price — and surfacing them gives a rich link preview
 * (e.g. the large image card iMessage renders from og:image + og:title).
 */
export const HammerPriceMeta: React.FC<
  React.PropsWithChildren<HammerPriceMetaProps>
> = ({ auctionResult }) => {
  const data = useFragment(FRAGMENT, auctionResult)

  const puzzleNumber = getPuzzleNumber({ auctionResultId: data.internalID })

  const artistName = data.artist?.name ?? "Unknown artist"
  const title = data.title ?? "Untitled"

  return (
    <MetaTags
      title={`${artistName}, ${title} | Hammer Price${puzzleNumber ? ` #${puzzleNumber}` : ""} | Artsy`}
      socialTitle={`Guess the hammer price: ${artistName}, ${title} | Artsy`}
      description={`Can you guess what ${artistName}’s “${title}” sold for at auction? Six guesses, a new puzzle every day.`}
      imageURL={data.images?.larger?.url}
      pathname={`/games/hammer-price/puzzles/${data.internalID}`}
    />
  )
}

const FRAGMENT = graphql`
  fragment HammerPriceMeta_auctionResult on AuctionResult {
    internalID
    title
    artist {
      name
    }
    images {
      larger {
        url(version: "larger")
      }
    }
  }
`
