/**
 * @generated SignedSource<<c00ad1e403495334106caa9668f74b32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCombinedRoute_artist$data = {
  readonly href: string | null | undefined;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "7d420add2160eada30986616b4d002b9";

export default node;
