/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NewForYouApp_viewer = {
    readonly " $fragmentRefs": FragmentRefs<"NewForYouArtworksGrid_viewer">;
    readonly " $refType": "NewForYouApp_viewer";
};
export type NewForYouApp_viewer$data = NewForYouApp_viewer;
export type NewForYouApp_viewer$key = {
    readonly " $data"?: NewForYouApp_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"NewForYouApp_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewForYouApp_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NewForYouArtworksGrid_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'c0853067c5df9e2c4f11fa5787d41abb';
export default node;
