import NoArtIcon from "@artsy/icons/NoArtIcon"
import {
  Box,
  Column,
  Flex,
  GridColumns,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  type HammerPriceGameStatus,
  deriveGameStatus,
} from "Apps/Games/Routes/HammerPrice/Utils/deriveGameStatus"
import {
  type HammerPriceGameProgress,
  hammerPriceProgressStore,
} from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"
import { realizedPriceToTargetDigits } from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import {
  getPuzzleIds,
  getPuzzleNumber,
} from "Apps/Games/Routes/HammerPrice/Utils/puzzleSelection"
import { HAMMER_PRICE_MAX_GUESSES } from "Apps/Games/Routes/HammerPrice/hammerPricePuzzles"
import { MetaTags } from "Components/MetaTags"
import { TopContextBar } from "Components/TopContextBar"
import { RouterLink } from "System/Components/RouterLink"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import type { HammerPriceIndexAppPuzzleRowQuery } from "__generated__/HammerPriceIndexAppPuzzleRowQuery.graphql"
import { useEffect, useState } from "react"
import { graphql } from "react-relay"

export const HammerPriceIndexApp: React.FC = () => {
  const puzzleIds = getPuzzleIds()

  // Progress lives in localStorage, so it is only read after mount to keep
  // server and client renders identical.
  const [progressByAuctionResultId, setProgressByAuctionResultId] = useState<
    Record<string, HammerPriceGameProgress>
  >({})

  useEffect(() => {
    const entries = hammerPriceProgressStore
      .listProgress()
      .map(progress => [progress.auctionResultId, progress] as const)

    setProgressByAuctionResultId(Object.fromEntries(entries))
  }, [])

  return (
    <>
      <MetaTags
        title="Hammer Price — Browse Puzzles | Artsy"
        description="Guess the hammer price of a real auction result, digit by digit, in six tries."
        pathname="/games/hammer-price/puzzles"
      />

      <TopContextBar displayBackArrow href="/">
        Return to Artsy
      </TopContextBar>

      <Box mt={4} pb={12}>
        <Text as="h1" variant="xl">
          Hammer Price
        </Text>

        <Text variant="sm" color="mono60">
          Guess the hammer price of a real auction result, digit by digit, in
          six tries.
        </Text>

        <Spacer y={4} />

        <GridColumns gridRowGap={4}>
          {puzzleIds.map(auctionResultId => {
            return (
              <Column span={[6, 4, 2]} key={auctionResultId}>
                <PuzzleTile
                  auctionResultId={auctionResultId}
                  progress={progressByAuctionResultId[auctionResultId]}
                />
              </Column>
            )
          })}
        </GridColumns>
      </Box>
    </>
  )
}

interface PuzzleTileProps {
  auctionResultId: string
  progress?: HammerPriceGameProgress
}

const PuzzleTile: React.FC<React.PropsWithChildren<PuzzleTileProps>> = ({
  auctionResultId,
  progress,
}) => {
  // Only fetch a tile’s record once it scrolls into view, so the grid doesn’t
  // fire every query on load.
  const [inView, setInView] = useState(false)

  const { ref } = useIntersectionObserver<HTMLDivElement>({
    once: true,
    options: { threshold: 0, rootMargin: "200px" },
    onIntersection: () => setInView(true),
  })

  const { data, loading, error } =
    useClientQuery<HammerPriceIndexAppPuzzleRowQuery>({
      query: PUZZLE_ROW_QUERY,
      variables: { auctionResultId },
      skip: !inView,
    })

  const auctionResult = data?.auctionResult

  // Pending covers both "not yet in view" and "in view but still fetching"
  const isPending = !inView || loading

  const puzzleNumber = getPuzzleNumber({ auctionResultId })

  const targetDigits = realizedPriceToTargetDigits(
    auctionResult?.priceRealized?.centsUSD,
  )

  const status: HammerPriceGameStatus = targetDigits
    ? deriveGameStatus({ targetDigits, guesses: progress?.guesses ?? [] })
    : "notStarted"

  const image = auctionResult?.images?.larger?.cropped

  return (
    <div ref={ref}>
      <RouterLink
        to={`/games/hammer-price/puzzles/${auctionResultId}`}
        textDecoration="none"
        display="block"
      >
        <ResponsiveBox
          aspectWidth={1}
          aspectHeight={1}
          maxWidth="100%"
          bg="mono10"
        >
          {isPending ? (
            <SkeletonBox width="100%" height="100%" />
          ) : image ? (
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width="100%"
              height="100%"
              alt=""
              lazyLoad
              style={{ display: "block" }}
            />
          ) : (
            <Flex
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
            >
              <NoArtIcon height={24} width={24} fill="mono60" />
            </Flex>
          )}
        </ResponsiveBox>

        <Spacer y={1} />

        {isPending ? (
          <>
            <SkeletonText variant="sm-display">Artist Name</SkeletonText>
            <SkeletonText variant="xs">Artwork title</SkeletonText>
          </>
        ) : (
          <>
            <Text variant="sm-display" lineClamp={1}>
              {puzzleNumber && `#${puzzleNumber} — `}
              {error || !auctionResult
                ? "Unavailable"
                : (auctionResult.artist?.name ?? "Unknown artist")}
            </Text>

            <Text variant="xs" color="mono60" lineClamp={1}>
              {auctionResult?.title ?? "—"}
            </Text>
          </>
        )}

        <StatusLabel
          status={status}
          guessCount={progress?.guesses.length ?? 0}
        />
      </RouterLink>
    </div>
  )
}

interface StatusLabelProps {
  status: HammerPriceGameStatus
  guessCount: number
}

const StatusLabel: React.FC<React.PropsWithChildren<StatusLabelProps>> = ({
  status,
  guessCount,
}) => {
  const getLabel = () => {
    if (status === "won") {
      return {
        text: `Solved ${guessCount}/${HAMMER_PRICE_MAX_GUESSES}`,
        color: "green100",
      }
    }

    if (status === "lost") {
      return { text: "Missed", color: "red100" }
    }

    if (status === "inProgress") {
      return {
        text: `In progress ${guessCount}/${HAMMER_PRICE_MAX_GUESSES}`,
        color: "blue100",
      }
    }

    return { text: "Not started", color: "mono60" }
  }

  const { text, color } = getLabel()

  return (
    <Text variant="xs" color={color}>
      {text}
    </Text>
  )
}

const PUZZLE_ROW_QUERY = graphql`
  query HammerPriceIndexAppPuzzleRowQuery($auctionResultId: String!) {
    auctionResult(id: $auctionResultId) {
      internalID
      title
      artist {
        name
      }
      images {
        larger {
          cropped(width: 300, height: 300, version: "larger") {
            src
            srcSet
          }
        }
      }
      priceRealized {
        centsUSD
      }
    }
  }
`
