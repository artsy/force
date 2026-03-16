/**
 * @generated SignedSource<<0dc922053bdc3b7d9c2bd7909a034f0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistTombstone_artist$data = {
  readonly internalID: string;
  readonly " $fragmentType": "ArtistTombstone_artist";
};
export type ArtistTombstone_artist$key = {
  readonly " $data"?: ArtistTombstone_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistTombstone_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistTombstone_artist",
  "selections": [
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

(node as any).hash = "5515ff9bf9ff64df56346437ca42cb88";

export default node;
