/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type BankAccountPicker_order = {
    readonly internalID: string;
    readonly mode: CommerceOrderModeEnum | null;
    readonly " $refType": "BankAccountPicker_order";
};
export type BankAccountPicker_order$data = BankAccountPicker_order;
export type BankAccountPicker_order$key = {
    readonly " $data"?: BankAccountPicker_order$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"BankAccountPicker_order">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BankAccountPicker_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
(node as any).hash = '214c0dfe185ee06062a187465a579309';
export default node;
