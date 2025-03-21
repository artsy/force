/**
 * @generated SignedSource<<ef8759ff674b8aa4635a3a9077acebce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewsApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NewsIndexArticles_viewer">;
  readonly " $fragmentType": "NewsApp_viewer";
};
export type NewsApp_viewer$key = {
  readonly " $data"?: NewsApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewsApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewsApp_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NewsIndexArticles_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "4ffa0e5cf3a7d02307a9cabaf6b894c8";

export default node;
