/**
 * @generated SignedSource<<8e9daf0fab91730222fdf1a6c3b50d92>>
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
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAbove_artist" | "ArtistHeader_artist" | "ArtistMeta_artist">;
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
      "name": "slug",
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

(node as any).hash = "6de163b40d68f6c3df5957ce5ab8381d";

export default node;
