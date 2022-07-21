/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkFilterArtworkGrid_filtered_artworks = {
    readonly id: string;
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
    readonly " $refType": "ArtworkFilterArtworkGrid_filtered_artworks";
};
export type ArtworkFilterArtworkGrid_filtered_artworks$data = ArtworkFilterArtworkGrid_filtered_artworks;
export type ArtworkFilterArtworkGrid_filtered_artworks$key = {
    readonly " $data"?: ArtworkFilterArtworkGrid_filtered_artworks$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
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
  "name": "ArtworkFilterArtworkGrid_filtered_artworks",
  "selections": [
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
  "type": "FilterArtworksConnection",
  "abstractKey": null
};
})();
(node as any).hash = '04cd49aefae4484840f678821ea905e1';
export default node;
