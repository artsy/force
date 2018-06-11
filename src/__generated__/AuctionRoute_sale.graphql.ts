/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type AuctionRoute_sale = {
  readonly id: string
  readonly name: string | null
  readonly description: string | null
  readonly artworks: ReadonlyArray<
    | ({
        readonly id: string
      })
    | null
  > | null
}

const node: ConcreteFragment = (function() {
  var v0 = {
      kind: 'ScalarField',
      alias: null,
      name: 'id',
      args: null,
      storageKey: null,
    },
    v1 = {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    }
  return {
    kind: 'Fragment',
    name: 'AuctionRoute_sale',
    type: 'Sale',
    metadata: null,
    argumentDefinitions: [],
    selections: [
      v0,
      {
        kind: 'ScalarField',
        alias: null,
        name: 'name',
        args: null,
        storageKey: null,
      },
      {
        kind: 'ScalarField',
        alias: null,
        name: 'description',
        args: null,
        storageKey: null,
      },
      {
        kind: 'LinkedField',
        alias: null,
        name: 'artworks',
        storageKey: null,
        args: null,
        concreteType: 'Artwork',
        plural: true,
        selections: [v0, v1],
      },
      v1,
    ],
  }
})()
;(node as any).hash = 'fc8c00189519a76837a5fd91e6e39d71'
export default node
