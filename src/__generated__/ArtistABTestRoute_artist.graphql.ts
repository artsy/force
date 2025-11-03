/**
 * @generated SignedSource<<844917246dd64bb54df7c8370a44959f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistABTestRoute_artist$data = {
  readonly internalID: string;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCombinedRoute_artist">;
  readonly " $fragmentType": "ArtistABTestRoute_artist";
};
export type ArtistABTestRoute_artist$key = {
  readonly " $data"?: ArtistABTestRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistABTestRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistABTestRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistCombinedRoute_artist"
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

(node as any).hash = "bab1c2eb0044150997482c3bdd63d514";

export default node;
