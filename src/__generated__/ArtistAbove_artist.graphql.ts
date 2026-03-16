/**
 * @generated SignedSource<<f1cb9e0e02fd786bfdcd619bbdd6bb7b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAbove_artist$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAbout_artist" | "ArtistBreadcrumb_artist" | "ArtistEditorial_artist" | "ArtistNotableWorks_artist" | "ArtistRepresentation_artist" | "ArtistTombstone_artist">;
  readonly " $fragmentType": "ArtistAbove_artist";
};
export type ArtistAbove_artist$key = {
  readonly " $data"?: ArtistAbove_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAbove_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAbove_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistBreadcrumb_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistTombstone_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistNotableWorks_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistAbout_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistRepresentation_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistEditorial_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "56d47a5f13bec40b278a78a9278126e8";

export default node;
