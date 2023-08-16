/**
 * @generated SignedSource<<c402ac6995afabdfd499e067792b3edc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertNameInput_previewSavedSearch$data = {
  readonly displayName: string;
  readonly " $fragmentType": "SavedSearchAlertNameInput_previewSavedSearch";
};
export type SavedSearchAlertNameInput_previewSavedSearch$key = {
  readonly " $data"?: SavedSearchAlertNameInput_previewSavedSearch$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertNameInput_previewSavedSearch">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertNameInput_previewSavedSearch",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayName",
      "storageKey": null
    }
  ],
  "type": "PreviewSavedSearch",
  "abstractKey": null
};

(node as any).hash = "f6012e331da9a867f56c20d9a2c01653";

export default node;
