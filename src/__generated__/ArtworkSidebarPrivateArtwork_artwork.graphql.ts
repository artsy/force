/**
 * @generated SignedSource<<a1efabe82f3a1a283058afe86dc6018e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Visibility = "LISTED" | "UNLISTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarPrivateArtwork_artwork$data = {
  readonly partner: {
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined;
  readonly visibilityLevel: Visibility | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarPrivateArtwork_artwork";
};
export type ArtworkSidebarPrivateArtwork_artwork$key = {
  readonly " $data"?: ArtworkSidebarPrivateArtwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarPrivateArtwork_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarPrivateArtwork_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibilityLevel",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "793a4f5c6ace218f949202878dfb7f59";

export default node;
