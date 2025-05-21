/**
 * @generated SignedSource<<e5551354ab08a5064b127cb5e406a3a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
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
      readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutLoadingSkeleton_order" | "Order2CollapsibleOrderSummary_order" | "Order2FulfillmentDetailsStep_order" | "Order2ReviewStep_order">;
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
                "name": "Order2ReviewStep_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2CheckoutLoadingSkeleton_order"
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

(node as any).hash = "6697bd1aefd7a81f1c3e612b8ac278a7";

export default node;
