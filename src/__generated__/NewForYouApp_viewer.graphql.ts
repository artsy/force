/**
 * @generated SignedSource<<1128b87a1e830b4e5bee063970f460f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewForYouApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NewForYouArtworksGrid_viewer">;
  readonly " $fragmentType": "NewForYouApp_viewer";
};
export type NewForYouApp_viewer$key = {
  readonly " $data"?: NewForYouApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewForYouApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "includeBackfill"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "maxWorksPerArtist"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "version"
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
        },
        {
          "kind": "Variable",
          "name": "includeBackfill",
          "variableName": "includeBackfill"
        },
        {
          "kind": "Variable",
          "name": "maxWorksPerArtist",
          "variableName": "maxWorksPerArtist"
        },
        {
          "kind": "Variable",
          "name": "version",
          "variableName": "version"
        }
      ],
      "kind": "FragmentSpread",
      "name": "NewForYouArtworksGrid_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "512be8c0a81573048dceddf8259b22c4";

export default node;
