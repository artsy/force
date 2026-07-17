/**
 * @generated SignedSource<<3e058e3b544be6aeacf8d0ed273ce97d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ImageSearchApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ImageSearchArtworksGrid_viewer">;
  readonly " $fragmentType": "ImageSearchApp_viewer";
};
export type ImageSearchApp_viewer$key = {
  readonly " $data"?: ImageSearchApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSearchApp_viewer">;
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
      "name": "s3Bucket"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "s3Key"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ImageSearchApp_viewer",
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
          "name": "s3Bucket",
          "variableName": "s3Bucket"
        },
        {
          "kind": "Variable",
          "name": "s3Key",
          "variableName": "s3Key"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ImageSearchArtworksGrid_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "b5f6394fe37094573a2512d0afbda125";

export default node;
