/**
 * @generated SignedSource<<a20e160324d46e97ac8c4cab077e0f6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowArtworks_show$data = {
  readonly filtered_artworks: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
  } | null;
  readonly " $fragmentType": "ShowArtworks_show";
};
export type ShowArtworks_show$key = {
  readonly " $data"?: ShowArtworks_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowArtworks_show">;
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
  "name": "ShowArtworks_show",
  "selections": [
    {
      "alias": "filtered_artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        },
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};

(node as any).hash = "f3b84e19b661602f32458232199f2ed0";

export default node;
