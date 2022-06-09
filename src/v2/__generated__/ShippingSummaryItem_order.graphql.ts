/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommercePaymentMethodEnum = "ACH_TRANSFER" | "CREDIT_CARD" | "OTHER" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
export type ShippingSummaryItem_order = {
    readonly state: CommerceOrderStateEnum;
    readonly paymentMethod: CommercePaymentMethodEnum | null;
    readonly requestedFulfillment: {
        readonly __typename: string;
        readonly " $fragmentRefs": FragmentRefs<"ShippingAddress_ship">;
    } | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly shippingOrigin: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ShippingSummaryItem_order";
};
export type ShippingSummaryItem_order$data = ShippingSummaryItem_order;
export type ShippingSummaryItem_order$key = {
    readonly " $data"?: ShippingSummaryItem_order$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ShippingSummaryItem_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShippingSummaryItem_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paymentMethod",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "requestedFulfillment",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ShippingAddress_ship"
        }
      ],
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
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "artwork",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "shippingOrigin",
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
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
(node as any).hash = '6b6c70e787b01d75b4bf97f952905b88';
export default node;
