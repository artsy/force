/**
 * @generated SignedSource<<57988ce8c1ad8420772b1cf8d6902c37>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Details_order$data = {
  readonly internalID: string;
  readonly " $fragmentType": "Details_order";
};
export type Details_order$key = {
  readonly " $data"?: Details_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Details_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Details_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "f0f462ace131e845faa70892fe9abb0d";

export default node;
