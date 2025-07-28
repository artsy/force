/**
 * @generated SignedSource<<efcc8d79f0b645327a2f880bf07d4b34>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkFilter_viewer$data = {
  readonly filtered_artworks: {
    readonly counts: {
      readonly total: any | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks" | "ImmersiveView_filtered_artworks">;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkFilter_viewer";
};
export type ArtworkFilter_viewer$key = {
  readonly " $data"?: ArtworkFilter_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilter_viewer">;
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
  "name": "ArtworkFilter_viewer",
  "selections": [
    {
      "alias": "filtered_artworks",
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ImmersiveView_filtered_artworks"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "format",
                  "value": "0,0"
                }
              ],
              "kind": "ScalarField",
              "name": "total",
              "storageKey": "total(format:\"0,0\")"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "93f5c93eb2d19fb3861095939b0c1d70";

export default node;
