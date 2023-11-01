/**
 * @generated SignedSource<<7bc37bcef3355223e75748962770e8ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAlertNameInput_previewSavedSearch$data = {
  readonly displayName: string;
  readonly " $fragmentType": "ArtworkAlertNameInput_previewSavedSearch";
};
export type ArtworkAlertNameInput_previewSavedSearch$key = {
  readonly " $data"?: ArtworkAlertNameInput_previewSavedSearch$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAlertNameInput_previewSavedSearch">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkAlertNameInput_previewSavedSearch",
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

(node as any).hash = "cd5683d43d46ba8cfd0fe5555fe05d79";

export default node;
