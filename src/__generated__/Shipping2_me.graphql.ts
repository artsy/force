/**
 * @generated SignedSource<<e6ccd3df033b7dbe92622c1631fec26c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Shipping2_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FulfillmentDetailsForm_me" | "ShippingContext_me">;
  readonly " $fragmentType": "Shipping2_me";
};
export type Shipping2_me$key = {
  readonly " $data"?: Shipping2_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Shipping2_me">;
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
  "name": "Shipping2_me",
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

(node as any).hash = "12530dc34ac63c879b4c56bda3518dcb";

export default node;
