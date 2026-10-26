/**
 * @generated SignedSource<<ef3e3288145c5ceaca8a2f86c2705d78>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistApp_artist$data = {
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeader_artist" | "ArtistMeta_artist">;
  readonly " $fragmentType": "ArtistApp_artist";
};
export type ArtistApp_artist$key = {
  readonly " $data"?: ArtistApp_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistApp_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistApp_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistMeta_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistHeader_artist"
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

(node as any).hash = "fa8eff2f41a68dfe4464e29bac0091ee";

export default node;
