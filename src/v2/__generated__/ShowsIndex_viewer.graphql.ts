/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowsIndex_viewer = {
    readonly " $fragmentRefs": FragmentRefs<"ShowsHeader_viewer">;
    readonly " $refType": "ShowsIndex_viewer";
};
export type ShowsIndex_viewer$data = ShowsIndex_viewer;
export type ShowsIndex_viewer$key = {
    readonly " $data"?: ShowsIndex_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowsIndex_viewer">;
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
  "type": "Viewer"
};
(node as any).hash = 'c31dd962c2da3643a6108f081cf98761';
export default node;
