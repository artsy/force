/**
 * @generated SignedSource<<91c082458bb719d7e9548c04b7e5b704>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkPageBanner_viewer">;
  readonly " $fragmentType": "ArtworkApp_viewer";
};
export type ArtworkApp_viewer$key = {
  readonly " $data"?: ArtworkApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_viewer">;
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
  "name": "ArtworkApp_viewer",
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
      "name": "ArtworkPageBanner_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "6e721a52a1314cba972d9a9bd14189b1";

export default node;
