/**
 * @generated SignedSource<<05f30aafb98c4e882c56b9c757565200>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Register_sale$data = {
  readonly slug: string;
  readonly internalID: string;
  readonly status: string | null;
  readonly requireIdentityVerification: boolean | null;
  readonly " $fragmentType": "Register_sale";
};
export type Register_sale$key = {
  readonly " $data"?: Register_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"Register_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Register_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requireIdentityVerification",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "555438fc585fbee0be6171fe3a713deb";

export default node;
