/**
 * @generated SignedSource<<654cb88f8fb9561adafa6956f0c4c56f>>
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
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "173e61d0564c804ebc4b5010e58bf94b";

export default node;
