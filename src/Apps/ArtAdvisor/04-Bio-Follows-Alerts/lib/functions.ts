import chalk from "chalk"
import { metaphysics } from "Apps/ArtAdvisor/04-Bio-Follows-Alerts/lib/metaphysics"

/*
 * Get the user's artsy profile as returned from the "me" query.
 */

export async function getUserProfile(args: { size: number; token: string }) {
  const query = `query getUserProfile {
    me {
      internalID
      name
      email
      followsAndSaves {
        artistsConnection(first: 10) {
          edges {
            node {
              artist {
                name
              }
            }
          }
        }
        genesConnection(first: 10) {
          edges {
            node {
              gene {
                name
              }
            }
          }
        }
      }
    }
  }`

  const variables = {
    size: args.size,
  }

  const headers = {
    "X-ACCESS-TOKEN": args.token,
    "Content-Type": "application/json",
  }

  const response = await metaphysics({ query, variables, headers })

  console.log(
    chalk.yellow("createAlert response: "),
    JSON.stringify(response, null, 2)
  )

  const profileOrError = response.data.me || response.errors

  return profileOrError
}

/*
 * Update the bio field on the user's collector profile. The bio can be a max of 150 characters.
 */

export async function updateCollectorProfile(args: {
  bio: string
  token: string
}) {
  const query = `mutation updateUserProfile($input: UpdateMyProfileInput!){
    updateMyUserProfile(input: $input) {
      __typename
      me {
        name
      }
      userOrError {
        ... on UpdateMyProfileMutationSuccess {
          user {
            collectorProfile {
              internalID
              bio
            }
          }
        }
        ... on UpdateMyProfileMutationFailure {
          mutationError {
            message
          }
        }
      }
    }
  }`

  const variables = {
    input: { bio: args.bio },
  }

  const headers = {
    "X-ACCESS-TOKEN": args.token,
    "Content-Type": "application/json",
  }

  const response = await metaphysics({ query, variables, headers })

  console.log(
    chalk.yellow("updateCollectorProfile response: "),
    JSON.stringify(response, null, 2)
  )

  const updatedBioOrError = response.data.updateMyUserProfile.userOrError

  return updatedBioOrError
}

/*
 * Follow an artist on behalf of the user.
 */

export async function followArtist(args: { artistID: string; token: string }) {
  const query = `mutation followArtist($input: FollowArtistInput!) {
    followArtist(input: $input) {
      artist {
        internalID
        name
        slug
      }
    }
  }`

  const variables = {
    input: { artistID: args.artistID },
  }

  const headers = {
    "X-ACCESS-TOKEN": args.token,
    "Content-Type": "application/json",
  }

  const response = await metaphysics({ query, variables, headers })

  console.log("followArtist response: ", JSON.stringify(response, null, 2))

  const followedArtistOrError =
    response.data.followArtist.artist || response.errors

  return followedArtistOrError
}

/*
 * Create an alert for the user. Currently, we only supports a single artist, a single rarity, and a single medium.
 */

export async function createAlert(args: {
  mediums: string
  artistID: string
  priceRange: string
  rarity: string
  token: string
}) {
  const query = `mutation createSavedSearch($input: CreateSavedSearchInput!) {
    createSavedSearch(input: $input) {
      savedSearchOrErrors {
        ... on SearchCriteria {
          internalID
        }
        ... on Errors {
          errors {
            message
          }
        }
      }
    }
  }`
  const variables = {
    input: {
      // NOTE: hard coded for now
      userAlertSettings: {
        email: true,
        push: true,
      },
      attributes: {
        additionalGeneIds: args.mediums,
        artistIDs: [args.artistID], // This is the only required attribute
        attributionClass: args.rarity,
        priceRange: args.priceRange,
      },
    },
  }

  const headers = {
    "X-ACCESS-TOKEN": args.token,
    "Content-Type": "application/json",
  }

  const response = await metaphysics({ query, variables, headers })

  console.log(
    chalk.yellow("createAlert response: "),
    JSON.stringify(response, null, 2)
  )

  const createdAlertOrError =
    response.data.createSavedSearch.savedSearchOrErrors

  return createdAlertOrError
}
