import {
  Box,
  Button,
  Join,
  Skeleton,
  SkeletonText,
  Spacer,
  Sup,
  Text,
} from "@artsy/palette"
import {
  CategoryRailFragmentContainer,
  CATEGORY_RAIL_PLACEHOLDER,
} from "Components/CategoryRail"
import { FC, Fragment, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { SettingsSavesCategoriesQuery } from "__generated__/SettingsSavesCategoriesQuery.graphql"
import { SettingsSavesCategories_me$data } from "__generated__/SettingsSavesCategories_me.graphql"

interface SettingsSavesCategoriesProps {
  me: SettingsSavesCategories_me$data
  relay: RelayPaginationProp
}

const SettingsSavesCategories: FC<SettingsSavesCategoriesProps> = ({
  me,
  relay,
}) => {
  const [loading, setLoading] = useState(false)

  const connection = me.followsAndSaves?.categoriesConnection
  const followedCategories = extractNodes(
    me.followsAndSaves?.categoriesConnection
  )
  const total = connection?.totalCount ?? 0

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(4, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Followed Categories {total > 0 && <Sup color="brand">{total}</Sup>}
      </Text>

      {followedCategories.length > 0 ? (
        <>
          <Join separator={<Spacer y={4} />}>
            {followedCategories.map(({ internalID, category }) => {
              if (!category) return null

              return (
                <CategoryRailFragmentContainer
                  key={internalID}
                  category={category}
                />
              )
            })}
          </Join>

          {relay.hasMore() && (
            <Box textAlign="center" mt={4}>
              <Button onClick={handleClick} loading={loading}>
                Show More
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Text variant={["md", "lg"]} color="black60">
          Nothing yet.
        </Text>
      )}
    </>
  )
}

export const SETTINGS_SAVES_CATEGORIES_QUERY = graphql`
  query SettingsSavesCategoriesQuery($after: String) {
    me {
      ...SettingsSavesCategories_me @arguments(after: $after)
    }
  }
`

export const SettingsSavesCategoriesPaginationContainer = createPaginationContainer(
  SettingsSavesCategories,
  {
    me: graphql`
      fragment SettingsSavesCategories_me on Me
        @argumentDefinitions(after: { type: "String" }) {
        followsAndSaves {
          categoriesConnection: genesConnection(first: 4, after: $after)
            @connection(key: "SettingsSavesCategories_categoriesConnection") {
            totalCount
            edges {
              node {
                internalID
                category: gene {
                  internalID
                  ...CategoryRail_category
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, totalCount }
    },
    getVariables(_, { cursor: after }, fragmentVariables) {
      return { ...fragmentVariables, after }
    },
    query: SETTINGS_SAVES_CATEGORIES_QUERY,
  }
)

const SETTINGS_SAVES_CATEGORIES_PLACEHOLDER = (
  <>
    <Skeleton>
      <SkeletonText variant={["md", "lg"]} mb={4}>
        Followed Categories
      </SkeletonText>
    </Skeleton>

    <Join separator={<Spacer y={4} />}>
      {[...new Array(4)].map((_, i) => {
        return <Fragment key={i}>{CATEGORY_RAIL_PLACEHOLDER}</Fragment>
      })}
    </Join>
  </>
)

export const SettingsSavesCategoriesQueryRenderer = () => {
  return (
    <SystemQueryRenderer<SettingsSavesCategoriesQuery>
      lazyLoad
      placeholder={SETTINGS_SAVES_CATEGORIES_PLACEHOLDER}
      query={SETTINGS_SAVES_CATEGORIES_QUERY}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return SETTINGS_SAVES_CATEGORIES_PLACEHOLDER
        }

        return <SettingsSavesCategoriesPaginationContainer me={props.me} />
      }}
    />
  )
}
