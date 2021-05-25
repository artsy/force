/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_artist = {
    readonly internalID: string;
    readonly " $fragmentRefs": FragmentRefs<"Artist2NotableWorksRail_artist" | "SelectedCareerAchievements_artist" | "Artist2WorksForSaleRail_artist" | "Artist2CurrentShowsRail_artist" | "Artist2CurrentArticlesRail_artist" | "Artist2RelatedArtistsRail_artist">;
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
      "name": "internalID",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2NotableWorksRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectedCareerAchievements_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2WorksForSaleRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2CurrentShowsRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2CurrentArticlesRail_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Artist2RelatedArtistsRail_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '7fc0cc65acd7b021b19fa83adfa3b96e';
export default node;
