/**
 * @generated SignedSource<<102fc5863e1b6cfbaabdd90212fb0f68>>
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
  readonly itemsTotal: {
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

const node: ReaderFragment = (function(){
var v0 = [
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
];
return {
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
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "itemsTotal",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "cb19c16d234bae12a7d81e12fff38b81";

export default node;
