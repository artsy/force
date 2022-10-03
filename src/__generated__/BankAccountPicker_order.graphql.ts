/**
 * @generated SignedSource<<0aa0daf192e70983e60bee7b3dd6cbcd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BankAccountPicker_order$data = {
  readonly bankAccountId: string | null;
  readonly internalID: string;
  readonly mode: CommerceOrderModeEnum | null;
  readonly paymentMethodDetails: {
    readonly internalID?: string;
    readonly last4?: string;
  } | null;
  readonly " $fragmentType": "BankAccountPicker_order";
};
export type BankAccountPicker_order$key = {
  readonly " $data"?: BankAccountPicker_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"BankAccountPicker_order">;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BankAccountPicker_order",
  "selections": [
    (v0/*: any*/),
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
      "name": "bankAccountId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "paymentMethodDetails",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "last4",
              "storageKey": null
            }
          ],
          "type": "BankAccount",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "af47de094175b0f2bb78406d24307d4d";

export default node;
