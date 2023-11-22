/**
 * @generated SignedSource<<e53cc020c20285d42c435c7e5ea9dec7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsCreditCard_creditCard$data = {
  readonly brand: string;
  readonly expirationMonth: number;
  readonly expirationYear: number;
  readonly internalID: string;
  readonly lastDigits: string;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "SettingsCreditCard_creditCard";
};
export type SettingsCreditCard_creditCard$key = {
  readonly " $data"?: SettingsCreditCard_creditCard$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsCreditCard_creditCard">;
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

(node as any).hash = "901989cbe42f4fb17b0fd6e9af202e93";

export default node;
