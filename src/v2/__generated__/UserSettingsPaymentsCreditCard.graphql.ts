/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettingsPaymentsCreditCard = {
    readonly id: string;
    readonly internalID: string;
    readonly brand: string;
    readonly lastDigits: string;
    readonly expirationYear: number;
    readonly expirationMonth: number;
    readonly __typename: "CreditCard";
    readonly " $refType": "UserSettingsPaymentsCreditCard";
};
export type UserSettingsPaymentsCreditCard$data = UserSettingsPaymentsCreditCard;
export type UserSettingsPaymentsCreditCard$key = {
    readonly " $data"?: UserSettingsPaymentsCreditCard$data;
    readonly " $fragmentRefs": FragmentRefs<"UserSettingsPaymentsCreditCard">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserSettingsPaymentsCreditCard",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "CreditCard"
};
(node as any).hash = 'e9f97eecca2ad74a3adc1a32b5adc428';
export default node;
