/* tslint:disable */
/* eslint-disable */

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
                    readonly displayName: string;
                    readonly price: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ShippingArtaSummaryItem_order";
};
export type ShippingArtaSummaryItem_order$data = ShippingArtaSummaryItem_order;
export type ShippingArtaSummaryItem_order$key = {
    readonly " $data"?: ShippingArtaSummaryItem_order$data;
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
                      "name": "displayName",
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
  "type": "CommerceOrder"
};
(node as any).hash = '53c40d83d3cc92e8fee4ac4b7c2a09d3';
export default node;
