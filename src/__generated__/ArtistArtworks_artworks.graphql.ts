/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type ArtistArtworks_artworks = ReadonlyArray<{
  readonly artist:
    | ({
        readonly name: string | null
      })
    | null
  readonly meta:
    | ({
        readonly title: string | null
      })
    | null
  readonly partner:
    | ({
        readonly name: string | null
      })
    | null
}>

const node: ConcreteFragment = (function() {
  var v0 = {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    },
    v1 = [
      {
        kind: 'ScalarField',
        alias: null,
        name: 'name',
        args: null,
        storageKey: null,
      },
      v0,
    ]
  return {
    kind: 'Fragment',
    name: 'ArtistArtworks_artworks',
    type: 'Artwork',
    metadata: {
      plural: true,
    },
    argumentDefinitions: [],
    selections: [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'artist',
        storageKey: null,
        args: null,
        concreteType: 'Artist',
        plural: false,
        selections: v1,
      },
      {
        kind: 'LinkedField',
        alias: null,
        name: 'meta',
        storageKey: null,
        args: null,
        concreteType: 'ArtworkMeta',
        plural: false,
        selections: [
          {
            kind: 'ScalarField',
            alias: null,
            name: 'title',
            args: null,
            storageKey: null,
          },
        ],
      },
      {
        kind: 'LinkedField',
        alias: null,
        name: 'partner',
        storageKey: null,
        args: null,
        concreteType: 'Partner',
        plural: false,
        selections: v1,
      },
      v0,
    ],
  }
})()
;(node as any).hash = 'f505e0dd0d10ed9d48cb7b5354697551'
export default node
