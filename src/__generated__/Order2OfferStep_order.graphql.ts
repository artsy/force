/**
 * @generated SignedSource<<160848cc35e9fe12394e3f4766bd69db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2OfferStep_order$data = {
  readonly currencyCode: string;
  readonly internalID: string;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly editionSets: ReadonlyArray<{
        readonly internalID: string;
      } | null | undefined> | null | undefined;
      readonly isPriceRange: boolean | null | undefined;
      readonly listPrice: {
        readonly __typename: "Money";
        readonly major: number;
      } | {
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
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly " $fragmentSpreads": FragmentRefs<"Order2ExactPriceOfferForm_order" | "Order2OfferCompletedView_order" | "Order2PriceRangeOfferForm_order">;
  readonly " $fragmentType": "Order2OfferStep_order";
};
export type Order2OfferStep_order$key = {
  readonly " $data"?: Order2OfferStep_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OfferStep_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2OfferStep_order",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
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
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "artwork",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isPriceRange",
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
                  "selections": (v1/*: any*/),
                  "type": "Money",
                  "abstractKey": null
                },
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
                      "selections": (v1/*: any*/),
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Money",
                      "kind": "LinkedField",
                      "name": "minPrice",
                      "plural": false,
                      "selections": (v1/*: any*/),
                      "storageKey": null
                    }
                  ],
                  "type": "PriceRange",
                  "abstractKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "EditionSet",
              "kind": "LinkedField",
              "name": "editionSets",
              "plural": true,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2ExactPriceOfferForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PriceRangeOfferForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2OfferCompletedView_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "a632b5f6d4caf27edaf13d036b006d95";

export default node;
