/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_artist = {
    readonly slug: string;
    readonly name: string | null;
    readonly counts: {
        readonly artworks: number | null;
    } | null;
    readonly internalID: string;
    readonly " $refType": "ArtistOverviewRoute_artist";
};
export type ArtistOverviewRoute_artist$data = ArtistOverviewRoute_artist;
export type ArtistOverviewRoute_artist$key = {
    readonly " $data"?: ArtistOverviewRoute_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistOverviewRoute_artist">;
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
(node as any).hash = '8406e33d38f3f4802a073421c8463b10';
export default node;
