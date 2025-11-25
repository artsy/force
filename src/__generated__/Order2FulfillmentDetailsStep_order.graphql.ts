/**
 * @generated SignedSource<<b9803885594e4ffc1bbbd08f29ca65ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "ARTSY_EXPRESS" | "ARTSY_STANDARD" | "ARTSY_WHITE_GLOVE" | "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2FulfillmentDetailsStep_order$data = {
  readonly availableShippingCountries: ReadonlyArray<string>;
  readonly fulfillmentDetails: {
    readonly addressLine1: string | null | undefined;
    readonly addressLine2: string | null | undefined;
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly name: string | null | undefined;
    readonly phoneNumber: {
      readonly countryCode: string | null | undefined;
      readonly display: string | null | undefined;
      readonly originalNumber: string | null | undefined;
      readonly regionCode: string | null | undefined;
    } | null | undefined;
    readonly postalCode: string | null | undefined;
    readonly region: string | null | undefined;
  } | null | undefined;
  readonly fulfillmentOptions: ReadonlyArray<{
    readonly selected: boolean | null | undefined;
    readonly type: FulfillmentOptionTypeEnum;
  }>;
  readonly id: string;
  readonly selectedFulfillmentOption: {
    readonly type: FulfillmentOptionTypeEnum;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryForm_order" | "Order2PickupForm_order" | "useCompleteFulfillmentDetailsData_order">;
  readonly " $fragmentType": "Order2FulfillmentDetailsStep_order";
};
export type Order2FulfillmentDetailsStep_order$key = {
  readonly " $data"?: Order2FulfillmentDetailsStep_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2FulfillmentDetailsStep_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2FulfillmentDetailsStep_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCompleteFulfillmentDetailsData_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2PickupForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2DeliveryForm_order"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FulfillmentDetails",
      "kind": "LinkedField",
      "name": "fulfillmentDetails",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PhoneNumberType",
          "kind": "LinkedField",
          "name": "phoneNumber",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "countryCode",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "regionCode",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "originalNumber",
              "storageKey": null
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "format",
                  "value": "INTERNATIONAL"
                }
              ],
              "kind": "ScalarField",
              "name": "display",
              "storageKey": "display(format:\"INTERNATIONAL\")"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "addressLine1",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "addressLine2",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "country",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "postalCode",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "region",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FulfillmentOption",
      "kind": "LinkedField",
      "name": "selectedFulfillmentOption",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FulfillmentOption",
      "kind": "LinkedField",
      "name": "fulfillmentOptions",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "selected",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availableShippingCountries",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "01a7f73d356c701b2871b29f022a9f0c";

export default node;
