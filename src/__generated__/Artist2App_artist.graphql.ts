/**
 * @generated SignedSource<<56541953aeb5807f52ba2585421d6e30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Artist2App_artist$data = {
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAbove_artist" | "ArtistMeta_artist">;
  readonly " $fragmentType": "Artist2App_artist";
};
export type Artist2App_artist$key = {
  readonly " $data"?: Artist2App_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"Artist2App_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2App_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistMeta_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistAbove_artist"
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

(node as any).hash = "f10440a56304de1d97e7057197cd8914";

export default node;
