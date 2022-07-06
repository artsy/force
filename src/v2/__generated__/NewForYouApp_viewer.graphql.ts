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
    readonly " $data"?: NewForYouApp_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NewForYouApp_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewForYouApp_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        }
      ],
      "kind": "FragmentSpread",
      "name": "NewForYouArtworksGrid_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '931ff1fd40cb3ac476d2a6b6da34e326';
export default node;
