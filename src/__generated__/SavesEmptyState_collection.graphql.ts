/**
 * @generated SignedSource<<3cdf46eb3724fb25d7923d0f3fa7da76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesEmptyState_collection$data = {
  readonly default: boolean;
  readonly " $fragmentType": "SavesEmptyState_collection";
};
export type SavesEmptyState_collection$key = {
  readonly " $data"?: SavesEmptyState_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesEmptyState_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesEmptyState_collection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "default",
      "storageKey": null
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "7dc00aad48af84a7188b19812ca47761";

export default node;
