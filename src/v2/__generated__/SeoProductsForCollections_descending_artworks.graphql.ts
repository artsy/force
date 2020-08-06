/* tslint:disable */

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
    "kind": "ScalarField",
    "alias": null,
    "name": "major",
    "args": [
      {
        "kind": "Literal",
        "name": "convertTo",
        "value": "USD"
      }
    ],
    "storageKey": "major(convertTo:\"USD\")"
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "currencyCode",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "SeoProductsForCollections_descending_artworks",
  "type": "FilterArtworksConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Artwork",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "availability",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "listPrice",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "type": "PriceRange",
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "minPrice",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Money",
                      "plural": false,
                      "selections": (v0/*: any*/)
                    },
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "maxPrice",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Money",
                      "plural": false,
                      "selections": (v0/*: any*/)
                    }
                  ]
                },
                {
                  "kind": "InlineFragment",
                  "type": "Money",
                  "selections": (v0/*: any*/)
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '3ed2186b3a7931bc9115d9f936826ac2';
export default node;
