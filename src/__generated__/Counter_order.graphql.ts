/**
 * @generated SignedSource<<f3fb48bb2be5c3155aa9c45dd67aee12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Counter_order$data = {
  readonly internalID: string;
  readonly itemsTotal: string | null;
  readonly lastOffer?: {
    readonly createdAt: string;
  } | null;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artwork: {
          readonly slug: string;
        } | null;
      } | null;
    } | null> | null;
  } | null;
  readonly mode: CommerceOrderModeEnum | null;
  readonly myLastOffer?: {
    readonly internalID: string;
  } | null;
  readonly state: CommerceOrderStateEnum;
  readonly stateExpiresAt: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSummaryItem_order" | "OfferHistoryItem_order" | "PaymentMethodSummaryItem_order" | "ShippingSummaryItem_order" | "TransactionDetailsSummaryItem_order">;
  readonly " $fragmentType": "Counter_order";
};
export type Counter_order$key = {
  readonly " $data"?: Counter_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Counter_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Counter_order",
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
      "name": "state",
      "storageKey": null
    },
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
      "name": "itemsTotal",
      "storageKey": "itemsTotal(precision:2)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stateExpiresAt",
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
          "name": "lastOffer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "createdAt",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "myLastOffer",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder",
      "abstractKey": null
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShippingSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PaymentMethodSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OfferHistoryItem_order"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "c5a2659e86e09f7d2a9f2469f551f3b7";

export default node;
