/**
 * @generated SignedSource<<fb986d9e82273ad35df779a7dd102871>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OfferSummaryItem_order$data = {
  readonly currencyCode: string;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artworkOrEditionSet: {
          readonly __typename: "Artwork";
          readonly price: string | null | undefined;
        } | {
          readonly __typename: "EditionSet";
          readonly price: string | null | undefined;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly myLastOffer?: {
    readonly amount: string | null | undefined;
    readonly note: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "OfferSummaryItem_order";
};
export type OfferSummaryItem_order$key = {
  readonly " $data"?: OfferSummaryItem_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"OfferSummaryItem_order">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "price",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OfferSummaryItem_order",
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
      "concreteType": "CommerceLineItemConnection",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "artworkOrEditionSet",
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
                      "selections": (v0/*: any*/),
                      "type": "Artwork",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": (v0/*: any*/),
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
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "myLastOffer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "precision",
                  "value": 2
                }
              ],
              "kind": "ScalarField",
              "name": "amount",
              "storageKey": "amount(precision:2)"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "note",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder",
      "abstractKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "838d32e682c55dbaf42bdf7f04d25ed7";

export default node;
