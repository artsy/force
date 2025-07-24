/**
 * @generated SignedSource<<3bda462256aa217546230bac63f32c3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarArtists_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly href: string | null | undefined;
    readonly id: string;
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined> | null | undefined;
  readonly culturalMaker: string | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarArtists_artwork";
};
export type ArtworkSidebarArtists_artwork$key = {
  readonly " $data"?: ArtworkSidebarArtists_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarArtists_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarArtists_artwork",
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
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        }
      ],
      "storageKey": "artists(shallow:true)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "85dcd301c0d6e5374dcb6829fd3b7945";

export default node;
