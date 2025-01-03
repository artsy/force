/**
 * @generated SignedSource<<9f1cc15e678c6aa2d1104f21288dc68e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowsCity_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ShowsHeader_viewer">;
  readonly " $fragmentType": "ShowsCity_viewer";
};
export type ShowsCity_viewer$key = {
  readonly " $data"?: ShowsCity_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowsCity_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowsCity_viewer",
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

(node as any).hash = "4f765f74936b40a58fcda2f2f977013c";

export default node;
