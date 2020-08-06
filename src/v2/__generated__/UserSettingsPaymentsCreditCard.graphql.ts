/* tslint:disable */

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
  "kind": "Fragment",
  "name": "UserSettingsPaymentsCreditCard",
  "type": "CreditCard",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "brand",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lastDigits",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "expirationYear",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "expirationMonth",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__typename",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'e9f97eecca2ad74a3adc1a32b5adc428';
export default node;
