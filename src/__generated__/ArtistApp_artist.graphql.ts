/**
 * @generated SignedSource<<dbc39472072ef0b83a594bd5054f3a7f>>
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
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeader_artist" | "ArtistMeta_artist" | "ArtistStructuredData_artist">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistStructuredData_artist"
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

(node as any).hash = "86bad2c896cb58640ef9e0eab6705e5f";

export default node;
