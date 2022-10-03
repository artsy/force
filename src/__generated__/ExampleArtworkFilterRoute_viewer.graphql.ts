/**
 * @generated SignedSource<<5814b8ce99734d0853bd12318459014e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExampleArtworkFilterRoute_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilter_viewer">;
  readonly " $fragmentType": "ExampleArtworkFilterRoute_viewer";
};
export type ExampleArtworkFilterRoute_viewer$key = {
  readonly " $data"?: ExampleArtworkFilterRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExampleArtworkFilterRoute_viewer">;
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

(node as any).hash = "0e6d20842a68ec0818614320b0aca562";

export default node;
