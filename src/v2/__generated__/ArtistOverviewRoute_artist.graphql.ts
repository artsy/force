/**
 * @generated SignedSource<<62ee6d708826f316070751e6234c1786>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_artist$data = {
  readonly slug: string;
  readonly name: string | null;
  readonly counts: {
    readonly artworks: Int | null;
  } | null;
  readonly internalID: string;
  readonly " $fragmentType": "ArtistOverviewRoute_artist";
};
export type ArtistOverviewRoute_artist$key = {
  readonly " $data"?: ArtistOverviewRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistOverviewRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistOverviewRoute_artist",
  "selections": [
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        }
      ],
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

(node as any).hash = "8406e33d38f3f4802a073421c8463b10";

export default node;
