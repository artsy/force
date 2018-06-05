/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type ArtistSearchResultsArtistMutationVariables = {
  readonly input: {
    readonly artist_id: string | null
    readonly unfollow: boolean | null
    readonly clientMutationId: string | null
  }
  readonly excludedArtistIds: ReadonlyArray<string | null>
}
export type ArtistSearchResultsArtistMutationResponse = {
  readonly followArtist:
    | ({
        readonly popular_artists:
          | ({
              readonly artists: ReadonlyArray<
                | ({
                    readonly id: string
                    readonly _id: string
                    readonly __id: string
                    readonly name: string | null
                    readonly image:
                      | ({
                          readonly cropped:
                            | ({
                                readonly url: string | null
                              })
                            | null
                        })
                      | null
                  })
                | null
              > | null
            })
          | null
        readonly artist:
          | ({
              readonly __id: string
              readonly related:
                | ({
                    readonly suggested:
                      | ({
                          readonly edges: ReadonlyArray<
                            | ({
                                readonly node:
                                  | ({
                                      readonly id: string
                                      readonly _id: string
                                      readonly __id: string
                                      readonly name: string | null
                                      readonly image:
                                        | ({
                                            readonly cropped:
                                              | ({
                                                  readonly url: string | null
                                                })
                                              | null
                                          })
                                        | null
                                    })
                                  | null
                              })
                            | null
                          > | null
                        })
                      | null
                  })
                | null
            })
          | null
      })
    | null
}

/*
mutation ArtistSearchResultsArtistMutation(
  $input: FollowArtistInput!
  $excludedArtistIds: [String]!
) {
  followArtist(input: $input) {
    popular_artists(size: 1, exclude_followed_artists: true, exclude_artist_ids: $excludedArtistIds) {
      artists {
        id
        _id
        __id
        name
        image {
          cropped(width: 100, height: 100) {
            url
          }
        }
      }
    }
    artist {
      __id
      related {
        suggested(first: 1, exclude_followed_artists: true, exclude_artist_ids: $excludedArtistIds) {
          edges {
            node {
              id
              _id
              __id
              name
              image {
                cropped(width: 100, height: 100) {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'input',
        type: 'FollowArtistInput!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'excludedArtistIds',
        type: '[String]!',
        defaultValue: null,
      },
    ],
    v1 = {
      kind: 'Variable',
      name: 'exclude_artist_ids',
      variableName: 'excludedArtistIds',
      type: '[String]',
    },
    v2 = {
      kind: 'Literal',
      name: 'exclude_followed_artists',
      value: true,
      type: 'Boolean',
    },
    v3 = {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    },
    v4 = [
      {
        kind: 'ScalarField',
        alias: null,
        name: 'id',
        args: null,
        storageKey: null,
      },
      {
        kind: 'ScalarField',
        alias: null,
        name: '_id',
        args: null,
        storageKey: null,
      },
      v3,
      {
        kind: 'ScalarField',
        alias: null,
        name: 'name',
        args: null,
        storageKey: null,
      },
      {
        kind: 'LinkedField',
        alias: null,
        name: 'image',
        storageKey: null,
        args: null,
        concreteType: 'Image',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            name: 'cropped',
            storageKey: 'cropped(height:100,width:100)',
            args: [
              {
                kind: 'Literal',
                name: 'height',
                value: 100,
                type: 'Int!',
              },
              {
                kind: 'Literal',
                name: 'width',
                value: 100,
                type: 'Int!',
              },
            ],
            concreteType: 'CroppedImageUrl',
            plural: false,
            selections: [
              {
                kind: 'ScalarField',
                alias: null,
                name: 'url',
                args: null,
                storageKey: null,
              },
            ],
          },
        ],
      },
    ],
    v5 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'followArtist',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
            type: 'FollowArtistInput!',
          },
        ],
        concreteType: 'FollowArtistPayload',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            name: 'popular_artists',
            storageKey: null,
            args: [
              v1,
              v2,
              {
                kind: 'Literal',
                name: 'size',
                value: 1,
                type: 'Int',
              },
            ],
            concreteType: 'PopularArtists',
            plural: false,
            selections: [
              {
                kind: 'LinkedField',
                alias: null,
                name: 'artists',
                storageKey: null,
                args: null,
                concreteType: 'Artist',
                plural: true,
                selections: v4,
              },
            ],
          },
          {
            kind: 'LinkedField',
            alias: null,
            name: 'artist',
            storageKey: null,
            args: null,
            concreteType: 'Artist',
            plural: false,
            selections: [
              v3,
              {
                kind: 'LinkedField',
                alias: null,
                name: 'related',
                storageKey: null,
                args: null,
                concreteType: 'RelatedArtists',
                plural: false,
                selections: [
                  {
                    kind: 'LinkedField',
                    alias: null,
                    name: 'suggested',
                    storageKey: null,
                    args: [
                      v1,
                      v2,
                      {
                        kind: 'Literal',
                        name: 'first',
                        value: 1,
                        type: 'Int',
                      },
                    ],
                    concreteType: 'ArtistConnection',
                    plural: false,
                    selections: [
                      {
                        kind: 'LinkedField',
                        alias: null,
                        name: 'edges',
                        storageKey: null,
                        args: null,
                        concreteType: 'ArtistEdge',
                        plural: true,
                        selections: [
                          {
                            kind: 'LinkedField',
                            alias: null,
                            name: 'node',
                            storageKey: null,
                            args: null,
                            concreteType: 'Artist',
                            plural: false,
                            selections: v4,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
  return {
    kind: 'Request',
    operationKind: 'mutation',
    name: 'ArtistSearchResultsArtistMutation',
    id: null,
    text:
      'mutation ArtistSearchResultsArtistMutation(\n  $input: FollowArtistInput!\n  $excludedArtistIds: [String]!\n) {\n  followArtist(input: $input) {\n    popular_artists(size: 1, exclude_followed_artists: true, exclude_artist_ids: $excludedArtistIds) {\n      artists {\n        id\n        _id\n        __id\n        name\n        image {\n          cropped(width: 100, height: 100) {\n            url\n          }\n        }\n      }\n    }\n    artist {\n      __id\n      related {\n        suggested(first: 1, exclude_followed_artists: true, exclude_artist_ids: $excludedArtistIds) {\n          edges {\n            node {\n              id\n              _id\n              __id\n              name\n              image {\n                cropped(width: 100, height: 100) {\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'ArtistSearchResultsArtistMutation',
      type: 'Mutation',
      metadata: null,
      argumentDefinitions: v0,
      selections: v5,
    },
    operation: {
      kind: 'Operation',
      name: 'ArtistSearchResultsArtistMutation',
      argumentDefinitions: v0,
      selections: v5,
    },
  }
})()
;(node as any).hash = 'be26c86b2efc4fd7dd40fe5689acf9dc'
export default node
