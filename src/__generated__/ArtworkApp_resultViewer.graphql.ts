/**
 * @generated SignedSource<<01a42834cf324e9232f800c80e536051>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_resultViewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_viewer">;
  readonly " $fragmentType": "ArtworkApp_resultViewer";
};
export type ArtworkApp_resultViewer$key = {
  readonly " $data"?: ArtworkApp_resultViewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_resultViewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "artworkID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_resultViewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "artworkID",
          "variableName": "artworkID"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtworkApp_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "0fa8d439ec5bd14dddd99d328dc6185e";

export default node;
