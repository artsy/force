/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Status_order = {
    readonly __typename: string;
    readonly internalID: string;
    readonly code: string;
    readonly state: CommerceOrderStateEnum;
    readonly mode: CommerceOrderModeEnum | null;
    readonly stateReason: string | null;
    readonly stateExpiresAt: string | null;
    readonly requestedFulfillment: ({
        readonly __typename: "CommerceShip";
    } | {
        readonly __typename: "CommercePickup";
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly fulfillments: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly courier: string;
                            readonly trackingId: string | null;
                            readonly estimatedDelivery: string | null;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly myLastOffer?: {
        readonly internalID: string;
        readonly amount: string | null;
        readonly amountCents: number;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSummaryItem_order" | "TransactionDetailsSummaryItem_order" | "ShippingSummaryItem_order" | "CreditCardSummaryItem_order">;
    readonly " $refType": "Status_order";
};
export type Status_order$data = Status_order;
export type Status_order$key = {
    readonly " $data"?: Status_order$data;
    readonly " $fragmentRefs": FragmentRefs<"Status_order">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v2 = [
  (v0/*: any*/)
],
v3 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
];
return {
  "kind": "Fragment",
  "name": "Status_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "code",
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
      "name": "mode",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "stateReason",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "stateExpiresAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D"
        }
      ],
      "storageKey": "stateExpiresAt(format:\"MMM D\")"
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "requestedFulfillment",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "type": "CommerceShip",
          "selections": (v2/*: any*/)
        },
        {
          "kind": "InlineFragment",
          "type": "CommercePickup",
          "selections": (v2/*: any*/)
        }
      ]
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
                  "name": "fulfillments",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "CommerceFulfillmentConnection",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "edges",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "CommerceFulfillmentEdge",
                      "plural": true,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "node",
                          "storageKey": null,
                          "args": null,
                          "concreteType": "CommerceFulfillment",
                          "plural": false,
                          "selections": [
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "courier",
                              "args": null,
                              "storageKey": null
                            },
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "trackingId",
                              "args": null,
                              "storageKey": null
                            },
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "estimatedDelivery",
                              "args": [
                                {
                                  "kind": "Literal",
                                  "name": "format",
                                  "value": "MMM Do, YYYY"
                                }
                              ],
                              "storageKey": "estimatedDelivery(format:\"MMM Do, YYYY\")"
                            }
                          ]
                        }
                      ]
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
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order",
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
      "kind": "InlineFragment",
      "type": "CommerceOfferOrder",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "amount",
              "args": (v3/*: any*/),
              "storageKey": "amount(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "amountCents",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "shippingTotal",
              "args": (v3/*: any*/),
              "storageKey": "shippingTotal(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "shippingTotalCents",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "taxTotal",
              "args": (v3/*: any*/),
              "storageKey": "taxTotal(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "taxTotalCents",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '6d7b7eae932926afe8a4dd215e13d78f';
export default node;
