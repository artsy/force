/**
 * @generated SignedSource<<c9fff8ab6bb3bbe59178ce2d11322f16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ImageSearchApp_viewer$data = {
  readonly artworksByImageConnection: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSearchArtworksGrid_viewer">;
  readonly " $fragmentType": "ImageSearchApp_viewer";
};
export type ImageSearchApp_viewer$key = {
  readonly " $data"?: ImageSearchApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSearchApp_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
];
return {
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
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksByImageConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "ImageSearchArtworksGrid_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "53414b36790e55ca7168363f8f9b1f04";

export default node;
