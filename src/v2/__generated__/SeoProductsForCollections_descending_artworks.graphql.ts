/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SeoProductsForCollections_descending_artworks = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly availability: string | null;
            readonly listPrice: ({
                readonly __typename: "PriceRange";
                readonly minPrice: {
                    readonly major: number;
                    readonly currencyCode: string;
                } | null;
                readonly maxPrice: {
                    readonly major: number;
                    readonly currencyCode: string;
                } | null;
            } | {
                readonly __typename: "Money";
                readonly major: number;
                readonly currencyCode: string;
            } | {
                /*This will never be '%other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            }) | null;
        } | null;
    } | null> | null;
    readonly " $refType": "SeoProductsForCollections_descending_artworks";
};
export type SeoProductsForCollections_descending_artworks$data = SeoProductsForCollections_descending_artworks;
export type SeoProductsForCollections_descending_artworks$key = {
    readonly " $data"?: SeoProductsForCollections_descending_artworks$data;
    readonly " $fragmentRefs": FragmentRefs<"SeoProductsForCollections_descending_artworks">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "convertTo",
        "value": "USD"
      }
    ],
    "kind": "ScalarField",
    "name": "major",
    "storageKey": "major(convertTo:\"USD\")"
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeoProductsForCollections_descending_artworks",
  "selections": [
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "availability",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "listPrice",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Money",
                      "kind": "LinkedField",
                      "name": "minPrice",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Money",
                      "kind": "LinkedField",
                      "name": "maxPrice",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": null
                    }
                  ],
                  "type": "PriceRange"
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v0/*: any*/),
                  "type": "Money"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection"
};
})();
(node as any).hash = '3ed2186b3a7931bc9115d9f936826ac2';
export default node;
