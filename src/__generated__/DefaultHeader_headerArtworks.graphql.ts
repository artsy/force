/**
 * @generated SignedSource<<69ee348c8b7c49d08935ff5ceec5058c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DefaultHeader_headerArtworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly " $fragmentSpreads": FragmentRefs<"DefaultHeaderArtwork_artwork">;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "DefaultHeader_headerArtworks";
};
export type DefaultHeader_headerArtworks$key = {
  readonly " $data"?: DefaultHeader_headerArtworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"DefaultHeader_headerArtworks">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DefaultHeader_headerArtworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "DefaultHeaderArtwork_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection",
  "abstractKey": null
};

(node as any).hash = "0d8bb416e06dcc10ce68c99eba44bb99";

export default node;
