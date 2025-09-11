/**
 * @generated SignedSource<<5ac3b1730f6063514c7598af36f2b505>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCombinedRoute_artist$data = {
  readonly id: string;
  readonly internalID: string;
  readonly " $fragmentType": "ArtistCombinedRoute_artist";
};
export type ArtistCombinedRoute_artist$key = {
  readonly " $data"?: ArtistCombinedRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCombinedRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCombinedRoute_artist",
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
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "0b2254e9c7dcd0963bab2c8072c37900";

export default node;
