/**
 * @generated SignedSource<<256c0abce9c1aa7e0caffaecb702964c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AlertNameInput_previewSavedSearch$data = {
  readonly displayName: string;
  readonly " $fragmentType": "AlertNameInput_previewSavedSearch";
};
export type AlertNameInput_previewSavedSearch$key = {
  readonly " $data"?: AlertNameInput_previewSavedSearch$data;
  readonly " $fragmentSpreads": FragmentRefs<"AlertNameInput_previewSavedSearch">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlertNameInput_previewSavedSearch",
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

(node as any).hash = "6caece317d320af6750f6ad8786fea90";

export default node;
