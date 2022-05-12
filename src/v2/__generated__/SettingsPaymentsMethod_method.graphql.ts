/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsPaymentsMethod_method = {
    readonly internalID: string;
    readonly name: string | null;
    readonly brand: string;
    readonly lastDigits: string;
    readonly expirationYear: number;
    readonly expirationMonth: number;
    readonly " $refType": "SettingsPaymentsMethod_method";
};
export type SettingsPaymentsMethod_method$data = SettingsPaymentsMethod_method;
export type SettingsPaymentsMethod_method$key = {
    readonly " $data"?: SettingsPaymentsMethod_method$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SettingsPaymentsMethod_method">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsPaymentsMethod_method",
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
(node as any).hash = 'cdb4785bc8d9f4da24b66625c06c3fbd';
export default node;
