/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ShippingSummaryItem_order = {
    readonly state: CommerceOrderStateEnum;
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
    readonly " $data"?: ShippingSummaryItem_order$data;
    readonly " $fragmentRefs": FragmentRefs<"ShippingSummaryItem_order">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ShippingSummaryItem_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "state",
      "args": null,
      "storageKey": null
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
          "kind": "ScalarField",
          "alias": null,
          "name": "__typename",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "ShippingAddress_ship",
          "args": null
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
                  "name": "artwork",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "shippingOrigin",
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
    }
  ]
};
(node as any).hash = '6a6edab4e4acbfb55e55f5fb1d9c4ae0';
export default node;
