/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PaymentSectionCreditCard = {
    readonly id: string;
    readonly internalID: string;
    readonly brand: string;
    readonly lastDigits: string;
    readonly expirationYear: number;
    readonly expirationMonth: number;
    readonly __typename: "CreditCard";
    readonly " $refType": "PaymentSectionCreditCard";
};
export type PaymentSectionCreditCard$data = PaymentSectionCreditCard;
export type PaymentSectionCreditCard$key = {
    readonly " $data"?: PaymentSectionCreditCard$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentSectionCreditCard">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentSectionCreditCard",
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
  "type": "CreditCard",
  "abstractKey": null
};
(node as any).hash = '3e0df1e268d025fb001efb260bdc369c';
export default node;
