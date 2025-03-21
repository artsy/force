import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { withProgressiveOnboardingCountsQuery } from "__generated__/withProgressiveOnboardingCountsQuery.graphql"
import type { ComponentType } from "react"
import { graphql } from "react-relay"

export interface WithProgressiveOnboardingCountsProps {
  counts: {
    isReady: boolean
    followedArtists: number
    followedProfiles: number
    savedArtworks: number
    savedSearches: number
  }
}

const INITIAL_COUNTS = {
  followedArtists: 0,
  followedProfiles: 0,
  savedArtworks: 0,
  savedSearches: 0,
}

export const withProgressiveOnboardingCounts = <
  T extends WithProgressiveOnboardingCountsProps,
>(
  Component: ComponentType<
    React.PropsWithChildren<T & WithProgressiveOnboardingCountsProps>
  >,
): ComponentType<React.PropsWithChildren<Omit<T, "counts">>> => {
  return (props: T) => {
    const { isLoggedIn } = useSystemContext()

    if (!isLoggedIn) {
      return (
        <Component {...props} counts={{ ...INITIAL_COUNTS, isReady: true }} />
      )
    }

    return (
      <SystemQueryRenderer<withProgressiveOnboardingCountsQuery>
        placeholder={
          <Component
            {...props}
            counts={{ ...INITIAL_COUNTS, isReady: false }}
          />
        }
        query={graphql`
          query withProgressiveOnboardingCountsQuery {
            me {
              counts {
                followedArtists
                followedProfiles
                savedArtworks
                savedSearches
              }
            }
          }
        `}
        render={({ props: renderProps, error }) => {
          if (error) {
            console.error(error)
            return (
              <Component
                {...props}
                counts={{ ...INITIAL_COUNTS, isReady: false }}
              />
            )
          }

          if (!renderProps?.me) {
            return (
              <Component
                {...props}
                counts={{ ...INITIAL_COUNTS, isReady: false }}
              />
            )
          }

          const counts = renderProps.me.counts || INITIAL_COUNTS

          return <Component {...props} counts={{ isReady: true, ...counts }} />
        }}
      />
    )
  }
}
