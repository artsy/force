/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type FollowArtistButtonMutationVariables = {
  readonly input: {
    readonly artist_id: string | null
    readonly unfollow: boolean | null
    readonly clientMutationId: string | null
  }
}
export type FollowArtistButtonMutationResponse = {
  readonly followArtist:
    | ({
        readonly artist:
          | ({
              readonly is_followed: boolean | null
            })
          | null
      })
    | null
}

/*
mutation FollowArtistButtonMutation(
  $input: FollowArtistInput!
) {
  followArtist(input: $input) {
    artist {
      is_followed
      __id
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
    ],
    v1 = [
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
            name: 'artist',
            storageKey: null,
            args: null,
            concreteType: 'Artist',
            plural: false,
            selections: [
              {
                kind: 'ScalarField',
                alias: null,
                name: 'is_followed',
                args: null,
                storageKey: null,
              },
              {
                kind: 'ScalarField',
                alias: null,
                name: '__id',
                args: null,
                storageKey: null,
              },
            ],
          },
        ],
      },
    ]
  return {
    kind: 'Request',
    operationKind: 'mutation',
    name: 'FollowArtistButtonMutation',
    id: null,
    text:
      'mutation FollowArtistButtonMutation(\n  $input: FollowArtistInput!\n) {\n  followArtist(input: $input) {\n    artist {\n      is_followed\n      __id\n    }\n  }\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'FollowArtistButtonMutation',
      type: 'Mutation',
      metadata: null,
      argumentDefinitions: v0,
      selections: v1,
    },
    operation: {
      kind: 'Operation',
      name: 'FollowArtistButtonMutation',
      argumentDefinitions: v0,
      selections: v1,
    },
  }
})()
;(node as any).hash = '8e43ee0d3d31c0036df241cef15d1160'
export default node
