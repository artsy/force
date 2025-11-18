/**
 * @generated SignedSource<<2bc4d47b9f01bef40ba37d0995e9c345>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2OfferOptions_order$data = {
  readonly currencyCode: string;
  readonly lineItems: ReadonlyArray<{
    readonly artworkOrEditionSet: {
      readonly listPrice?: {
        readonly __typename: "PriceRange";
        readonly maxPrice: {
          readonly major: number;
        } | null | undefined;
        readonly minPrice: {
          readonly major: number;
        } | null | undefined;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      } | null | undefined;
    } | null | undefined;
    readonly listPrice: {
      readonly __typename: "Money";
      readonly major: number;
    } | null | undefined;
  } | null | undefined>;
  readonly " $fragmentType": "Order2OfferOptions_order";
};
export type Order2OfferOptions_order$key = {
  readonly " $data"?: Order2OfferOptions_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OfferOptions_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "listPrice",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "maxPrice",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "minPrice",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          }
        ],
        "type": "PriceRange",
        "abstractKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2OfferOptions_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencyCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LineItem",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "listPrice",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "artworkOrEditionSet",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "Artwork",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "EditionSet",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "59fd4f4f14dc1b13d922a103182f7640";

export default node;
