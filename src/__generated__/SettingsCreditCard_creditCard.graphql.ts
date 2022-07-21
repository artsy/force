/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsCreditCard_creditCard = {
    readonly internalID: string;
    readonly name: string | null;
    readonly brand: string;
    readonly lastDigits: string;
    readonly expirationYear: number;
    readonly expirationMonth: number;
    readonly " $refType": "SettingsCreditCard_creditCard";
};
export type SettingsCreditCard_creditCard$data = SettingsCreditCard_creditCard;
export type SettingsCreditCard_creditCard$key = {
    readonly " $data"?: SettingsCreditCard_creditCard$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SettingsCreditCard_creditCard">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsCreditCard_creditCard",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "brand",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastDigits",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "expirationYear",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "expirationMonth",
      "storageKey": null
    }
  ],
  "type": "CreditCard",
  "abstractKey": null
};
(node as any).hash = '901989cbe42f4fb17b0fd6e9af202e93';
export default node;
