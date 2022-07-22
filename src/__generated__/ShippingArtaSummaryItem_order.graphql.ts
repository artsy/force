/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShippingArtaSummaryItem_order = {
    readonly requestedFulfillment: {
        readonly __typename: string;
    } | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly selectedShippingQuote: {
                    readonly typeName: string;
                    readonly price: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ShippingArtaSummaryItem_order";
};
export type ShippingArtaSummaryItem_order$data = ShippingArtaSummaryItem_order;
export type ShippingArtaSummaryItem_order$key = {
    readonly " $data"?: ShippingArtaSummaryItem_order$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ShippingArtaSummaryItem_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShippingArtaSummaryItem_order",
  "selections": [
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
                  "concreteType": "CommerceShippingQuote",
                  "kind": "LinkedField",
                  "name": "selectedShippingQuote",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "typeName",
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
                      "name": "price",
                      "storageKey": "price(precision:2)"
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
(node as any).hash = '53837b0dfca37358282774a18a4cdb5a';
export default node;
