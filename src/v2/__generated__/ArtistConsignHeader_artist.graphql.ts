/**
 * @generated SignedSource<<604aaf29b559bab8cf7a7ca59313876b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignHeader_artist$data = {
  readonly name: string | null;
  readonly href: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistConsignHeaderImages_artist">;
  readonly " $fragmentType": "ArtistConsignHeader_artist";
};
export type ArtistConsignHeader_artist$key = {
  readonly " $data"?: ArtistConsignHeader_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistConsignHeader_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignHeader_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignHeaderImages_artist"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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

(node as any).hash = "7d3a03283b2d243183694c0120190387";

export default node;
