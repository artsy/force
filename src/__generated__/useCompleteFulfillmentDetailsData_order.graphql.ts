/**
 * @generated SignedSource<<5f9aa6afc76c5ed8c888319294188fdf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FulfillmentOptionTypeEnum = "ARTSY_EXPRESS" | "ARTSY_STANDARD" | "ARTSY_WHITE_GLOVE" | "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useCompleteFulfillmentDetailsData_order$data = {
  readonly fulfillmentDetails: {
    readonly addressLine1: string | null | undefined;
    readonly addressLine2: string | null | undefined;
    readonly city: string | null | undefined;
    readonly country: string | null | undefined;
    readonly name: string | null | undefined;
    readonly phoneNumber: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly postalCode: string | null | undefined;
    readonly region: string | null | undefined;
  } | null | undefined;
  readonly selectedFulfillmentOption: {
    readonly type: FulfillmentOptionTypeEnum;
  } | null | undefined;
  readonly " $fragmentType": "useCompleteFulfillmentDetailsData_order";
};
export type useCompleteFulfillmentDetailsData_order$key = {
  readonly " $data"?: useCompleteFulfillmentDetailsData_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCompleteFulfillmentDetailsData_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCompleteFulfillmentDetailsData_order",
  "selections": [
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
        },
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "f684f9bf9cafde7302e5a7f9f5e8a03c";

export default node;
