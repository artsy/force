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
export type TagArtworks_tag = {
  readonly id: string
  readonly filtered_artworks:
    | ({
        readonly aggregations: ReadonlyArray<
          | ({
              readonly slice: ArtworkAggregation | null
              readonly counts: ReadonlyArray<
                | ({
                    readonly name: string | null
                    readonly id: string
                  })
                | null
              > | null
            })
          | null
        > | null
        readonly facet: ({}) | null
      })
    | null
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
    name: 'TagArtworks_tag',
    type: 'Tag',
    metadata: null,
    argumentDefinitions: [
      {
        kind: 'LocalArgument',
        name: 'for_sale',
        type: 'Boolean',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'medium',
        type: 'String',
        defaultValue: '*',
      },
      {
        kind: 'LocalArgument',
        name: 'aggregations',
        type: '[ArtworkAggregation]',
        defaultValue: ['MEDIUM', 'TOTAL', 'PRICE_RANGE', 'DIMENSION_RANGE'],
      },
      {
        kind: 'LocalArgument',
        name: 'price_range',
        type: 'String',
        defaultValue: '*',
      },
      {
        kind: 'LocalArgument',
        name: 'dimension_range',
        type: 'String',
        defaultValue: '*',
      },
    ],
    selections: [
      v0,
      {
        kind: 'LinkedField',
        alias: null,
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
            kind: 'Variable',
            name: 'dimension_range',
            variableName: 'dimension_range',
            type: 'String',
          },
          {
            kind: 'Variable',
            name: 'for_sale',
            variableName: 'for_sale',
            type: 'Boolean',
          },
          {
            kind: 'Variable',
            name: 'medium',
            variableName: 'medium',
            type: 'String',
          },
          {
            kind: 'Variable',
            name: 'price_range',
            variableName: 'price_range',
            type: 'String',
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
            kind: 'FragmentSpread',
            name: 'TagArtworksContent_filtered_artworks',
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
                kind: 'LinkedField',
                alias: null,
                name: 'counts',
                storageKey: null,
                args: null,
                concreteType: 'AggregationCount',
                plural: true,
                selections: [
                  {
                    kind: 'ScalarField',
                    alias: null,
                    name: 'name',
                    args: null,
                    storageKey: null,
                  },
                  v0,
                  v1,
                ],
              },
              {
                kind: 'FragmentSpread',
                name: 'Dropdown_aggregation',
                args: null,
              },
            ],
          },
          {
            kind: 'LinkedField',
            alias: null,
            name: 'facet',
            storageKey: null,
            args: null,
            concreteType: null,
            plural: false,
            selections: [
              {
                kind: 'FragmentSpread',
                name: 'Headline_facet',
                args: null,
              },
              v1,
            ],
          },
          v1,
        ],
      },
      v1,
    ],
  }
})()
;(node as any).hash = 'e338dce3de7771de5f87d5d3605e6c19'
export default node
