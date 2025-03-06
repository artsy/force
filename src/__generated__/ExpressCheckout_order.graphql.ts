/**
 * @generated SignedSource<<98afda31dab5a047959cb812b5b5270c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExpressCheckout_order$data = {
  readonly availableShippingCountries: ReadonlyArray<string>;
  readonly buyerTotal: {
    readonly currencyCode: string;
    readonly minor: any;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ExpressCheckoutUI_order">;
  readonly " $fragmentType": "ExpressCheckout_order";
};
export type ExpressCheckout_order$key = {
  readonly " $data"?: ExpressCheckout_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExpressCheckout_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExpressCheckout_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExpressCheckoutUI_order"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availableShippingCountries",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "buyerTotal",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "minor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currencyCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "a556166021d8b2b395d6f1d87307f77a";

export default node;
