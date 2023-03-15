/**
 * @generated SignedSource<<c00bc3582a3e276a8607500cb74b4b85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeader2Route_artist$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeader2_artist">;
  readonly " $fragmentType": "ArtistHeader2Route_artist";
};
export type ArtistHeader2Route_artist$key = {
  readonly " $data"?: ArtistHeader2Route_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeader2Route_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistHeader2Route_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistHeader2_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "11a44d0af9b837a70738ba317b70f255";

export default node;
