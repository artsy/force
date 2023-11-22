/**
 * @generated SignedSource<<cb484e9526c4fa5838642785f0715e05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSubApp_artist$data = {
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistBackLink_artist" | "ArtistMeta_artist">;
  readonly " $fragmentType": "ArtistSubApp_artist";
};
export type ArtistSubApp_artist$key = {
  readonly " $data"?: ArtistSubApp_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSubApp_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSubApp_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistMeta_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistBackLink_artist"
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "1c33f69ec19538c34f49bfb69d19fc0b";

export default node;
