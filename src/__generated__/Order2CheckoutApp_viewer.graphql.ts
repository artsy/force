/**
 * @generated SignedSource<<343f59e38e04d7fa33f0e456c6e8ddad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutApp_viewer$data = {
  readonly me: {
    readonly addressConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly order: {
      readonly fulfillmentOptions: ReadonlyArray<{
        readonly type: FulfillmentOptionTypeEnum;
      }>;
      readonly internalID: string;
      readonly lineItems: ReadonlyArray<{
        readonly artwork: {
          readonly isFixedShippingFeeOnly: boolean | null | undefined;
          readonly slug: string;
        } | null | undefined;
      } | null | undefined>;
      readonly mode: OrderModeEnum;
      readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutLoadingSkeleton_order" | "Order2CollapsibleOrderSummary_order" | "Order2ExpressCheckout_order" | "Order2FulfillmentDetailsStep_order" | "Order2HelpLinks_order" | "Order2PaymentStep_order" | "Order2ReviewStep_order">;
    };
  } | null | undefined;
  readonly " $fragmentType": "Order2CheckoutApp_viewer";
};
export type Order2CheckoutApp_viewer$key = {
  readonly " $data"?: Order2CheckoutApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutApp_viewer">;
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
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "orderID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutApp_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Me",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "kind": "RequiredField",
          "field": {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "orderID"
              }
            ],
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FulfillmentOption",
                "kind": "LinkedField",
                "name": "fulfillmentOptions",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                        "name": "isFixedShippingFeeOnly",
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
                "name": "Order2ExpressCheckout_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2CollapsibleOrderSummary_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2FulfillmentDetailsStep_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2PaymentStep_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2ReviewStep_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2CheckoutLoadingSkeleton_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2HelpLinks_order"
              }
            ],
            "storageKey": null
          },
          "action": "NONE"
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 10
            }
          ],
          "concreteType": "UserAddressConnection",
          "kind": "LinkedField",
          "name": "addressConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "UserAddressEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "UserAddress",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "addressConnection(first:10)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "9d91419c88d4354f9646230cbc6bc4cb";

export default node;
