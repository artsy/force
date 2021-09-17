/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_artist = {
    readonly name: string | null;
    readonly counts: {
        readonly artworks: number | null;
    } | null;
    readonly internalID: string;
    readonly " $fragmentRefs": FragmentRefs<"ArtistNotableWorksRail_artist" | "ArtistCareerHighlights_artist" | "ArtistWorksForSaleRail_artist" | "ArtistCurrentShowsRail_artist" | "ArtistCurrentArticlesRail_artist" | "ArtistRelatedArtistsRail_artist">;
    readonly " $refType": "ArtistOverviewRoute_artist";
};
export type ArtistOverviewRoute_artist$data = ArtistOverviewRoute_artist;
export type ArtistOverviewRoute_artist$key = {
    readonly " $data"?: ArtistOverviewRoute_artist$data;
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
      "name": "ArtistNotableWorksRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistCareerHighlights_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistWorksForSaleRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistCurrentShowsRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistCurrentArticlesRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistRelatedArtistsRail_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '751e99d3d16a87d5df8db9fe06d72e83';
export default node;
