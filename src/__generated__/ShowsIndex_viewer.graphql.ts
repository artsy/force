/**
 * @generated SignedSource<<d6834f4d2aa2fc929b167d84319a8ae4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsIndex_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ShowsHeader_viewer">;
  readonly " $fragmentType": "ShowsIndex_viewer";
};
export type ShowsIndex_viewer$key = {
  readonly " $data"?: ShowsIndex_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowsIndex_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsIndex_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowsHeader_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "c31dd962c2da3643a6108f081cf98761";

export default node;
