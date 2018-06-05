/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type FollowArtistButton_artist = {
  readonly __id: string
  readonly id: string
  readonly is_followed: boolean | null
}

const node: ConcreteFragment = {
  kind: 'Fragment',
  name: 'FollowArtistButton_artist',
  type: 'Artist',
  metadata: null,
  argumentDefinitions: [],
  selections: [
    {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    },
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
      name: 'is_followed',
      args: null,
      storageKey: null,
    },
  ],
}
;(node as any).hash = '872d90fb3feb3ba8549b783b1b5b5643'
export default node
