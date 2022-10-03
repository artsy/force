/**
 * @generated SignedSource<<2db3c5f9fc0ade0d02e9c835a444d900>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExampleArtistRoute_artist$data = {
  readonly bio: string | null;
  readonly internalID: string;
  readonly name: string | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"FollowArtistButton_artist">;
  readonly " $fragmentType": "ExampleArtistRoute_artist";
};
export type ExampleArtistRoute_artist$key = {
  readonly " $data"?: ExampleArtistRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExampleArtistRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExampleArtistRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist"
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
      "name": "bio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
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
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "5c3a5b92ce4c697e1a50a88e461491a2";

export default node;
