/**
 * @generated SignedSource<<e247c988495de6d1ef3e3022ac1ca04c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowArtistPopoverRow_artist$data = {
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  readonly " $fragmentType": "FollowArtistPopoverRow_artist";
};
export type FollowArtistPopoverRow_artist$key = {
  readonly " $data"?: FollowArtistPopoverRow_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowArtistPopoverRow_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowArtistPopoverRow_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EntityHeaderArtist_artist"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "bf665f4bb1bea0f20052eb4f3a2f328f";

export default node;
