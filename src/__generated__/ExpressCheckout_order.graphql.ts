/**
 * @generated SignedSource<<98c6a67ca49cb5ba420feba15dc6c0a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ExpressCheckout_order$data = {
  readonly buyerTotalCents: number | null | undefined;
  readonly currencyCode: string;
  readonly mode: CommerceOrderModeEnum | null | undefined;
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
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "buyerTotalCents",
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
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "620a60959e2c387217830480fcdb0950";

export default node;
