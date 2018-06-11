/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type GeneArtworksContent_filtered_artworks = {
  readonly __id: string
  readonly artworks:
    | ({
        readonly pageInfo: {
          readonly hasNextPage: boolean
          readonly endCursor: string | null
        }
        readonly edges: ReadonlyArray<
          | ({
              readonly node:
                | ({
                    readonly __id: string
                  })
                | null
            })
          | null
        > | null
      })
    | null
}

const node: ConcreteFragment = (function() {
  var v0 = {
    kind: 'ScalarField',
    alias: null,
    name: '__id',
    args: null,
    storageKey: null,
  }
  return {
    kind: 'Fragment',
    name: 'GeneArtworksContent_filtered_artworks',
    type: 'FilterArtworks',
    metadata: {
      connection: [
        {
          count: 'count',
          cursor: 'cursor',
          direction: 'forward',
          path: ['artworks'],
        },
      ],
    },
    argumentDefinitions: [
      {
        kind: 'LocalArgument',
        name: 'count',
        type: 'Int',
        defaultValue: 10,
      },
      {
        kind: 'LocalArgument',
        name: 'cursor',
        type: 'String',
        defaultValue: '',
      },
      {
        kind: 'RootArgument',
        name: 'sort',
        type: 'String',
      },
    ],
    selections: [
      v0,
      {
        kind: 'LinkedField',
        alias: 'artworks',
        name: '__GeneArtworksContent_filtered_artworks_connection',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'sort',
            variableName: 'sort',
            type: 'String',
          },
        ],
        concreteType: 'ArtworkConnection',
        plural: false,
        selections: [
          {
            kind: 'LinkedField',
            alias: null,
            name: 'pageInfo',
            storageKey: null,
            args: null,
            concreteType: 'PageInfo',
            plural: false,
            selections: [
              {
                kind: 'ScalarField',
                alias: null,
                name: 'hasNextPage',
                args: null,
                storageKey: null,
              },
              {
                kind: 'ScalarField',
                alias: null,
                name: 'endCursor',
                args: null,
                storageKey: null,
              },
            ],
          },
          {
            kind: 'FragmentSpread',
            name: 'ArtworkGrid_artworks',
            args: null,
          },
          {
            kind: 'LinkedField',
            alias: null,
            name: 'edges',
            storageKey: null,
            args: null,
            concreteType: 'ArtworkEdge',
            plural: true,
            selections: [
              {
                kind: 'LinkedField',
                alias: null,
                name: 'node',
                storageKey: null,
                args: null,
                concreteType: 'Artwork',
                plural: false,
                selections: [
                  v0,
                  {
                    kind: 'ScalarField',
                    alias: null,
                    name: '__typename',
                    args: null,
                    storageKey: null,
                  },
                ],
              },
              {
                kind: 'ScalarField',
                alias: null,
                name: 'cursor',
                args: null,
                storageKey: null,
              },
            ],
          },
        ],
      },
    ],
  }
})()
;(node as any).hash = 'd30d59f658dfd8265d9991f69697e6f5'
export default node
