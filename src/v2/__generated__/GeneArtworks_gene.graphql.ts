/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type GeneArtworks_gene = {
    readonly slug: string;
    readonly filtered_artworks: {
        readonly aggregations: ReadonlyArray<{
            readonly slice: ArtworkAggregation | null;
            readonly counts: ReadonlyArray<{
                readonly name: string;
                readonly value: string;
            } | null> | null;
            readonly " $fragmentRefs": FragmentRefs<"Dropdown_aggregation">;
        } | null> | null;
        readonly id: string;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
            } | null;
        } | null> | null;
        readonly facet: {
            readonly " $fragmentRefs": FragmentRefs<"Headline_facet">;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"TotalCount_filter_artworks" | "ArtworkGrid_artworks">;
    } | null;
    readonly " $refType": "GeneArtworks_gene";
};
export type GeneArtworks_gene$data = GeneArtworks_gene;
export type GeneArtworks_gene$key = {
    readonly " $data"?: GeneArtworks_gene$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneArtworks_gene">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "forSale",
      "type": "Boolean"
    },
    {
      "defaultValue": "*",
      "kind": "LocalArgument",
      "name": "medium",
      "type": "String"
    },
    {
      "defaultValue": [
        "MEDIUM",
        "TOTAL",
        "PRICE_RANGE",
        "DIMENSION_RANGE"
      ],
      "kind": "LocalArgument",
      "name": "aggregations",
      "type": "[ArtworkAggregation]"
    },
    {
      "defaultValue": "*",
      "kind": "LocalArgument",
      "name": "priceRange",
      "type": "String"
    },
    {
      "defaultValue": "*",
      "kind": "LocalArgument",
      "name": "dimensionRange",
      "type": "String"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String"
    },
    {
      "defaultValue": "-partner_updated_at",
      "kind": "LocalArgument",
      "name": "sort",
      "type": "String"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "filtered_artworks"
        ]
      }
    ]
  },
  "name": "GeneArtworks_gene",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "filtered_artworks",
      "args": [
        {
          "kind": "Variable",
          "name": "aggregations",
          "variableName": "aggregations"
        },
        {
          "kind": "Variable",
          "name": "dimensionRange",
          "variableName": "dimensionRange"
        },
        {
          "kind": "Variable",
          "name": "forSale",
          "variableName": "forSale"
        },
        {
          "kind": "Literal",
          "name": "includeMediumFilterInAggregation",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium"
        },
        {
          "kind": "Variable",
          "name": "priceRange",
          "variableName": "priceRange"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "__GeneArtworks_filtered_artworks_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworksAggregationResults",
          "kind": "LinkedField",
          "name": "aggregations",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slice",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AggregationCount",
              "kind": "LinkedField",
              "name": "counts",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "value",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Dropdown_aggregation"
            }
          ],
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "facet",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Headline_facet"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "TotalCount_filter_artworks"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Gene"
};
})();
(node as any).hash = 'b01d2dade7bee09c755965c23ca51464';
export default node;
