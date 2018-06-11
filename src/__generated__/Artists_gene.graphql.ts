/* tslint:disable */

import { ConcreteFragment } from 'relay-runtime'
export type ArtworkAggregation =
  | 'COLOR'
  | 'DIMENSION_RANGE'
  | 'FOLLOWED_ARTISTS'
  | 'GALLERY'
  | 'INSTITUTION'
  | 'MAJOR_PERIOD'
  | 'MEDIUM'
  | 'MERCHANDISABLE_ARTISTS'
  | 'PARTNER_CITY'
  | 'PERIOD'
  | 'PRICE_RANGE'
  | 'TOTAL'
  | '%future added value'
export type Artists_gene = {
  readonly __id: string
  readonly artists:
    | ({
        readonly pageInfo: {
          readonly hasNextPage: boolean
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
  readonly filter_aggregations:
    | ({
        readonly aggregations: ReadonlyArray<
          | ({
              readonly slice: ArtworkAggregation | null
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
    name: 'Artists_gene',
    type: 'Gene',
    metadata: {
      connection: [
        {
          count: 'count',
          cursor: 'cursor',
          direction: 'forward',
          path: ['artists'],
        },
      ],
    },
    argumentDefinitions: [
      {
        kind: 'LocalArgument',
        name: 'aggregations',
        type: '[ArtworkAggregation]',
        defaultValue: ['MEDIUM', 'TOTAL', 'PRICE_RANGE', 'DIMENSION_RANGE'],
      },
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
    ],
    selections: [
      v0,
      {
        kind: 'LinkedField',
        alias: 'artists',
        name: '__Artists_artists_connection',
        storageKey: null,
        args: null,
        concreteType: 'ArtistConnection',
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
                selections: [
                  v0,
                  {
                    kind: 'FragmentSpread',
                    name: 'ArtistRow_artist',
                    args: null,
                  },
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
      {
        kind: 'LinkedField',
        alias: 'filter_aggregations',
        name: 'filtered_artworks',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'aggregations',
            variableName: 'aggregations',
            type: '[ArtworkAggregation]',
          },
          {
            kind: 'Literal',
            name: 'include_medium_filter_in_aggregation',
            value: true,
            type: 'Boolean',
          },
          {
            kind: 'Literal',
            name: 'size',
            value: 0,
            type: 'Int',
          },
        ],
        concreteType: 'FilterArtworks',
        plural: false,
        selections: [
          {
            kind: 'FragmentSpread',
            name: 'TotalCount_filter_artworks',
            args: null,
          },
          {
            kind: 'LinkedField',
            alias: null,
            name: 'aggregations',
            storageKey: null,
            args: null,
            concreteType: 'ArtworksAggregationResults',
            plural: true,
            selections: [
              {
                kind: 'ScalarField',
                alias: null,
                name: 'slice',
                args: null,
                storageKey: null,
              },
              {
                kind: 'FragmentSpread',
                name: 'Dropdown_aggregation',
                args: null,
              },
            ],
          },
          v0,
        ],
      },
    ],
  }
})()
;(node as any).hash = 'c21a21d79040bd329707d9e8f2d6f805'
export default node
