import {
  ARTWORK_LIST_ARTWORK_GRID_ID,
  ArtworkListArtworksGridFragmentContainer,
} from "./ArtworkListArtworksGrid"
import { ArtworkListContent_me$data } from "__generated__/ArtworkListContent_me.graphql"
import { ArtworkListContentQuery } from "__generated__/ArtworkListContentQuery.graphql"
import {
  ArtworkFilterContextProvider,
  Counts,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { SortOptions } from "Components/SortFilter"
import { FC, useEffect } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { useRouter } from "System/Hooks/useRouter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Clickable, Flex, Join, Spacer, Text, Tooltip } from "@artsy/palette"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { ArtworkListArtworksGridPlaceholder } from "./ArtworkListPlaceholders"
import { ArtworkListContextualMenu } from "./Actions/ArtworkListContextualMenu"
import { useJump } from "Utils/Hooks/useJump"
import { useArtworkListVisibilityContext } from "Apps/CollectorProfile/Routes/Saves/Utils/useArtworkListVisibility"
import { ARTWORK_LIST_SCROLL_TARGET_ID } from "Apps/CollectorProfile/Routes/Saves/CollectorProfileSavesRoute"
import HideIcon from "@artsy/icons/HideIcon"
import { useTranslation } from "react-i18next"

interface ArtworkListContentQueryRendererProps {
  listID: string
  initialPage?: number
  initialSort?: string
}

interface ArtworkListContentProps {
  me: ArtworkListContent_me$data
  relay: RelayRefetchProp
  initialPage?: number
  initialSort?: string
}

const sortOptions: SortOptions = [
  { value: "SAVED_AT_DESC", text: "Recently Added" },
  { value: "SAVED_AT_ASC", text: "First Added" },
]
const defaultSort = sortOptions[0].value

function isContentOutOfView() {
  const element = document.querySelector(
    `#JUMP--${ARTWORK_LIST_ARTWORK_GRID_ID}`
  )
  if (element === null) return false

  const { top } = element.getBoundingClientRect()
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight
  return top >= viewportHeight
}

const ArtworkListContent: FC<ArtworkListContentProps> = ({ me, relay }) => {
  const { t } = useTranslation()
  const { match } = useRouter()

  const { jumpTo } = useJump()
  const { artworkListItemHasBeenTouched } = useArtworkListVisibilityContext()
  const artworkList = me.artworkList
  const counts: Counts = {
    artworks: artworkList?.artworks?.totalCount ?? 0,
  }

  useEffect(() => {
    const shouldScroll = isContentOutOfView() && artworkListItemHasBeenTouched

    if (shouldScroll) {
      jumpTo(ARTWORK_LIST_SCROLL_TARGET_ID)
    }
  }, [jumpTo, artworkListItemHasBeenTouched])

  return (
    <ArtworkFilterContextProvider
      filters={match.location.query}
      counts={counts}
      sortOptions={sortOptions}
      onChange={state => {
        updateUrl(state, {
          defaultValues: {
            sort: defaultSort,
          },
        })
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Join separator={<Spacer x={2} />}>
          <Flex alignItems="center">
            <Text variant="lg-display">{artworkList?.name}</Text>
            {!artworkList?.shareableWithPartners && (
              <Tooltip
                pointer
                variant="defaultDark"
                placement="bottom-start"
                content={
                  <Text variant="xs">
                    {t("collectorSaves.artworkListsHeader.hideIconTooltip")}
                  </Text>
                }
              >
                <Clickable style={{ lineHeight: 0 }}>
                  <HideIcon minWidth="18px" data-testid="hide-icon" ml={0.5} />
                </Clickable>
              </Tooltip>
            )}
          </Flex>
          {!artworkList?.default && artworkList && (
            <ArtworkListContextualMenu artworkList={artworkList} />
          )}
        </Join>
      </Flex>

      <Spacer y={4} />

      <ArtworkListArtworksGridFragmentContainer
        me={me}
        relayRefetch={relay.refetch}
      />
    </ArtworkFilterContextProvider>
  )
}

const QUERY = graphql`
  query ArtworkListContentQuery(
    $listID: String!
    $sort: CollectionArtworkSorts
    $page: Int
  ) {
    me {
      ...ArtworkListContent_me
        @arguments(listID: $listID, page: $page, sort: $sort)
    }
  }
`

export const ArtworkListContentRefetchContainer = createRefetchContainer(
  ArtworkListContent,
  {
    me: graphql`
      fragment ArtworkListContent_me on Me
        @argumentDefinitions(
          listID: { type: "String!" }
          page: { type: "Int", defaultValue: 1 }
          sort: { type: "CollectionArtworkSorts" }
        ) {
        artworkList: collection(id: $listID) {
          internalID
          name
          default
          shareableWithPartners
          artworks: artworksConnection(first: 30, page: $page, sort: $sort) {
            totalCount
          }
        }
        ...ArtworkListArtworksGrid_me
          @arguments(listID: $listID, page: $page, sort: $sort)
      }
    `,
  },
  QUERY
)

export const ArtworkListContentQueryRenderer: FC<ArtworkListContentQueryRendererProps> = ({
  listID,
  initialPage,
  initialSort,
}) => {
  return (
    <SystemQueryRenderer<ArtworkListContentQuery>
      placeholder={<ArtworkListArtworksGridPlaceholder />}
      query={QUERY}
      variables={{
        listID,
        sort: initialSort ?? defaultSort,
        page: initialPage,
      }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return <ArtworkListArtworksGridPlaceholder />
        }

        return <ArtworkListContentRefetchContainer me={props.me} />
      }}
    />
  )
}
