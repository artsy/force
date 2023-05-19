import {
  Box,
  Button,
  Column,
  GridColumns,
  Skeleton,
  SkeletonText,
  Sup,
  Text,
} from "@artsy/palette"
import { EntityHeaderFairFragmentContainer } from "Components/EntityHeaders/EntityHeaderFair"
import { EntityHeaderFairOrganizerFragmentContainer } from "Components/EntityHeaders/EntityHeaderFairOrganizer"
import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { FC, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { SettingsSavesProfilesQuery } from "__generated__/SettingsSavesProfilesQuery.graphql"
import { SettingsSavesProfiles_me$data } from "__generated__/SettingsSavesProfiles_me.graphql"

interface SettingsSavesProfilesProps {
  me: SettingsSavesProfiles_me$data
  relay: RelayPaginationProp
}

const SettingsSavesProfiles: FC<SettingsSavesProfilesProps> = ({
  me,
  relay,
}) => {
  const [loading, setLoading] = useState(false)

  const connection = me.followsAndSaves?.profilesConnection
  const followedProfiles = extractNodes(me.followsAndSaves?.profilesConnection)
  const total = connection?.totalCount ?? 0

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(12, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Followed Galleries & Institutions{" "}
        {total > 0 && <Sup color="brand">{total}</Sup>}
      </Text>

      {followedProfiles.length > 0 ? (
        <>
          <GridColumns>
            {followedProfiles.map(({ internalID, profile }) => {
              if (!profile) return null

              return (
                <Column key={internalID} span={[12, 4, 3]}>
                  {(() => {
                    switch (profile.owner.__typename) {
                      case "Partner":
                        return (
                          <EntityHeaderPartnerFragmentContainer
                            key={internalID}
                            partner={profile.owner}
                          />
                        )

                      case "Fair":
                        return (
                          <EntityHeaderFairFragmentContainer
                            key={internalID}
                            fair={profile.owner}
                          />
                        )

                      case "FairOrganizer":
                        return (
                          <EntityHeaderFairOrganizerFragmentContainer
                            key={internalID}
                            fairOrganizer={profile.owner}
                          />
                        )
                    }
                  })()}
                </Column>
              )
            })}
          </GridColumns>

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

export const SETTINGS_SAVES_PROFILES_QUERY = graphql`
  query SettingsSavesProfilesQuery($after: String) {
    me {
      ...SettingsSavesProfiles_me @arguments(after: $after)
    }
  }
`

export const SettingsSavesProfilesPaginationContainer = createPaginationContainer(
  SettingsSavesProfiles,
  {
    me: graphql`
      fragment SettingsSavesProfiles_me on Me
        @argumentDefinitions(after: { type: "String" }) {
        followsAndSaves {
          profilesConnection(first: 12, after: $after)
            @connection(key: "SettingsSavesProfiles_profilesConnection") {
            totalCount
            edges {
              node {
                internalID
                profile {
                  name
                  href
                  avatar: image {
                    cropped(width: 45, height: 45) {
                      src
                      srcSet
                    }
                  }
                  owner {
                    __typename
                    ... on Partner {
                      ...EntityHeaderPartner_partner
                    }
                    ... on Fair {
                      ...EntityHeaderFair_fair
                    }
                    ... on FairOrganizer {
                      ...EntityHeaderFairOrganizer_fairOrganizer
                    }
                  }
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
    query: SETTINGS_SAVES_PROFILES_QUERY,
  }
)

const SETTINGS_SAVES_PROFILES_PLACEHOLDER = (
  <>
    <Skeleton>
      <SkeletonText variant={["md", "lg"]} mb={4}>
        Followed Profiles
      </SkeletonText>
    </Skeleton>

    <GridColumns>
      {[...new Array(12)].map((_, i) => {
        return (
          <Column key={i} span={[12, 4, 3]}>
            <EntityHeaderPlaceholder />
          </Column>
        )
      })}
    </GridColumns>
  </>
)

export const SettingsSavesProfilesQueryRenderer = () => {
  return (
    <SystemQueryRenderer<SettingsSavesProfilesQuery>
      lazyLoad
      placeholder={SETTINGS_SAVES_PROFILES_PLACEHOLDER}
      query={SETTINGS_SAVES_PROFILES_QUERY}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return SETTINGS_SAVES_PROFILES_PLACEHOLDER
        }

        return <SettingsSavesProfilesPaginationContainer me={props.me} />
      }}
    />
  )
}
