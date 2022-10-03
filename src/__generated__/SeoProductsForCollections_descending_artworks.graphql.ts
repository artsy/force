/**
 * @generated SignedSource<<670b33d339f23e35beb1a169ae725b1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeoProductsForCollections_descending_artworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly availability: string | null;
      readonly id: string;
      readonly listPrice: {
        readonly __typename: "Money";
        readonly currencyCode: string;
        readonly major: number;
      } | {
        readonly __typename: "PriceRange";
        readonly maxPrice: {
          readonly currencyCode: string;
          readonly major: number;
        } | null;
        readonly minPrice: {
          readonly currencyCode: string;
          readonly major: number;
        } | null;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      } | null;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "SeoProductsForCollections_descending_artworks";
};
export type SeoProductsForCollections_descending_artworks$key = {
  readonly " $data"?: SeoProductsForCollections_descending_artworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeoProductsForCollections_descending_artworks">;
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
                  "type": "PriceRange",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v0/*: any*/),
                  "type": "Money",
                  "abstractKey": null
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
  "type": "FilterArtworksConnection",
  "abstractKey": null
};
})();

(node as any).hash = "3ed2186b3a7931bc9115d9f936826ac2";

export default node;
