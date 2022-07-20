/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesApp_me = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesArtworksFilter_me">;
    readonly " $refType": "ArtistSeriesApp_me";
};
export type ArtistSeriesApp_me$data = ArtistSeriesApp_me;
export type ArtistSeriesApp_me$key = {
    readonly " $data"?: ArtistSeriesApp_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistSeriesArtworksFilter_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'f4048cc9ad3af6947fed36a7c0e5c9f4';
export default node;
