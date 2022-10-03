/**
 * @generated SignedSource<<2e9815c0f88d20d73e018b5134228d59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2Artists_artwork$data = {
  readonly culturalMaker: string | null;
  readonly artists: ReadonlyArray<{
    readonly slug: string;
    readonly name: string | null;
  } | null> | null;
  readonly " $fragmentType": "ArtworkSidebar2Artists_artwork";
};
export type ArtworkSidebar2Artists_artwork$key = {
  readonly " $data"?: ArtworkSidebar2Artists_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2Artists_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2Artists_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "culturalMaker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "ce3010f7e6914505dbfa02d0c82b0331";

export default node;
