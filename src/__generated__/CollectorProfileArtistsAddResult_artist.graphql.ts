/**
 * @generated SignedSource<<491a9921b1d98713e1bb83309b706d03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileArtistsAddResult_artist$data = {
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  readonly " $fragmentType": "CollectorProfileArtistsAddResult_artist";
};
export type CollectorProfileArtistsAddResult_artist$key = {
  readonly " $data"?: CollectorProfileArtistsAddResult_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileArtistsAddResult_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileArtistsAddResult_artist",
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

(node as any).hash = "099e0334e4fa98762c1851c77879cb60";

export default node;
