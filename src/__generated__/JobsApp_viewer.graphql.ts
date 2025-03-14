/**
 * @generated SignedSource<<5f38e5ce9b5c5a55a893aa92d519cd0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JobsApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JobsFilter_viewer">;
  readonly " $fragmentType": "JobsApp_viewer";
};
export type JobsApp_viewer$key = {
  readonly " $data"?: JobsApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"JobsApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JobsApp_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JobsFilter_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "9f8ac2fe7c98208cbcde0bf6bf403191";

export default node;
