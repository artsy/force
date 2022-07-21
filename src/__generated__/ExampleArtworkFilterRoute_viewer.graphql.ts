/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExampleArtworkFilterRoute_viewer = {
    readonly " $fragmentRefs": FragmentRefs<"ArtworkFilter_viewer">;
    readonly " $refType": "ExampleArtworkFilterRoute_viewer";
};
export type ExampleArtworkFilterRoute_viewer$data = ExampleArtworkFilterRoute_viewer;
export type ExampleArtworkFilterRoute_viewer$key = {
    readonly " $data"?: ExampleArtworkFilterRoute_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ExampleArtworkFilterRoute_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExampleArtworkFilterRoute_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtworkFilter_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '0e6d20842a68ec0818614320b0aca562';
export default node;
