/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type ArtworkFilterArtworkGrid2_filtered_artworks = {
    readonly id: string;
    readonly aggregations: ReadonlyArray<{
        readonly slice: ArtworkAggregation | null;
        readonly counts: ReadonlyArray<{
            readonly value: string;
            readonly name: string;
            readonly count: number;
        } | null> | null;
    } | null> | null;
    readonly pageInfo: {
        readonly hasNextPage: boolean;
        readonly endCursor: string | null;
    };
    readonly pageCursors: {
        readonly " $fragmentRefs": FragmentRefs<"Pagination_pageCursors">;
    };
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
        } | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
    readonly " $refType": "ArtworkFilterArtworkGrid2_filtered_artworks";
};
export type ArtworkFilterArtworkGrid2_filtered_artworks$data = ArtworkFilterArtworkGrid2_filtered_artworks;
export type ArtworkFilterArtworkGrid2_filtered_artworks$key = {
    readonly " $data"?: ArtworkFilterArtworkGrid2_filtered_artworks$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkFilterArtworkGrid2_filtered_artworks">;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkFilterArtworkGrid2_filtered_artworks",
  "selections": [
    (v0/*: any*/),
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
              "name": "value",
              "storageKey": null
            },
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
              "name": "count",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
      "concreteType": "PageCursors",
      "kind": "LinkedField",
      "name": "pageCursors",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Pagination_pageCursors"
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
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkGrid_artworks"
    }
  ],
  "type": "FilterArtworksConnection"
};
})();
(node as any).hash = '3b186cfca981d2185ec31f15f09ca8f2';
export default node;
