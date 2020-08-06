/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Respond_order = {
    readonly internalID: string;
    readonly mode: CommerceOrderModeEnum | null;
    readonly state: CommerceOrderStateEnum;
    readonly currencyCode: string;
    readonly itemsTotal: string | null;
    readonly itemsTotalCents: number | null;
    readonly totalListPrice: string | null;
    readonly totalListPriceCents: number;
    readonly stateExpiresAt: string | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly slug: string;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly lastOffer?: {
        readonly createdAt: string;
        readonly internalID: string;
        readonly note: string | null;
    } | null;
    readonly myLastOffer?: {
        readonly createdAt: string;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"TransactionDetailsSummaryItem_order" | "ArtworkSummaryItem_order" | "ShippingSummaryItem_order" | "CreditCardSummaryItem_order" | "OfferHistoryItem_order">;
    readonly " $refType": "Respond_order";
};
export type Respond_order$data = Respond_order;
export type Respond_order$key = {
    readonly " $data"?: Respond_order$data;
    readonly " $fragmentRefs": FragmentRefs<"Respond_order">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Respond_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "mode",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "state",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "currencyCode",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemsTotal",
      "args": (v1/*: any*/),
      "storageKey": "itemsTotal(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemsTotalCents",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": (v1/*: any*/),
      "storageKey": "totalListPrice(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPriceCents",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "stateExpiresAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lineItems",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceLineItemConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artwork",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "slug",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "InlineFragment",
      "type": "CommerceOfferOrder",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "lastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v0/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "note",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "plural": false,
          "selections": [
            (v2/*: any*/)
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShippingSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "CreditCardSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "OfferHistoryItem_order",
      "args": null
    }
  ]
};
})();
(node as any).hash = '5b8133ec8a17977aa86f219db0b50846';
export default node;
