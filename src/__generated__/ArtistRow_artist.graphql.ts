/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type ArtistRow_artist = {
  readonly name: string | null
  readonly href: string | null
  readonly artworks: ({}) | null
}

const node: ConcreteFragment = {
  kind: 'Fragment',
  name: 'ArtistRow_artist',
  type: 'Artist',
  metadata: null,
  argumentDefinitions: [],
  selections: [
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
      name: 'href',
      args: null,
      storageKey: null,
    },
    {
      kind: 'FragmentSpread',
      name: 'Follow_artist',
      args: null,
    },
    {
      kind: 'LinkedField',
      alias: 'artworks',
      name: 'artworks_connection',
      storageKey: 'artworks_connection(first:6)',
      args: [
        {
          kind: 'Literal',
          name: 'first',
          value: 6,
          type: 'Int',
        },
      ],
      concreteType: 'ArtworkConnection',
      plural: false,
      selections: [
        {
          kind: 'FragmentSpread',
          name: 'Fillwidth_artworks',
          args: null,
        },
      ],
    },
    {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    },
  ],
}
;(node as any).hash = 'b65c87fce5097ae99473b0bbd008e4a1'
export default node
