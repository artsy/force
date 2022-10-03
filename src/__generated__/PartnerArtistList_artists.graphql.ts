/**
 * @generated SignedSource<<90b469abd2d4a919a6e0cbeffb79b0c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistList_artists$data = ReadonlyArray<{
  readonly counts: {
    readonly artworks: any | null;
  } | null;
  readonly node: {
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistItem_artist">;
  } | null;
  readonly representedBy: boolean | null;
  readonly " $fragmentType": "PartnerArtistList_artists";
}>;
export type PartnerArtistList_artists$key = ReadonlyArray<{
  readonly " $data"?: PartnerArtistList_artists$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistList_artists">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PartnerArtistList_artists",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "representedBy",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PartnerArtistItem_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistPartnerEdge",
  "abstractKey": null
};

(node as any).hash = "43f62dc2e715435fc8ebc6d90b287413";

export default node;
