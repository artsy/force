/**
 * @generated SignedSource<<0e8b7f5f13ad6f14e875f227e6987433>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Shipping_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FulfillmentDetailsForm_me" | "ShippingContext_me">;
  readonly " $fragmentType": "Shipping_me";
};
export type Shipping_me$key = {
  readonly " $data"?: Shipping_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Shipping_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "before"
    },
    {
      "defaultValue": 30,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "last"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Shipping_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FulfillmentDetailsForm_me"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ShippingContext_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "333ca775bab381e61be0a76ce53046c1";

export default node;
