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
    readonly " $fragmentRefs": FragmentRefs<"ArtistRelatedCategories_artist">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistRelatedCategories_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = 'd8b831130625b277164d8cb792e1f84c';
export default node;
