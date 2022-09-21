/**
 * @generated SignedSource<<b0769b74f0adec2a0c33a1e939e4ef83>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkGrid_artist$data = {
  readonly artworks_connection: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  } | null;
  readonly " $fragmentType": "ArtworkGrid_artist";
};
export type ArtworkGrid_artist$key = {
  readonly " $data"?: ArtworkGrid_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkGrid_artist",
  "selections": [
    {
      "alias": "artworks_connection",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 4
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks"
        }
      ],
      "storageKey": "artworksConnection(first:4)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "2993b1c9335bd41e7d807b765cc2d6fd";

export default node;
