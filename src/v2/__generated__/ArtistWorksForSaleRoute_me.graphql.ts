/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistWorksForSaleRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistArtworkFilter_me">;
    readonly " $refType": "ArtistWorksForSaleRoute_me";
};
export type ArtistWorksForSaleRoute_me$data = ArtistWorksForSaleRoute_me;
export type ArtistWorksForSaleRoute_me$key = {
    readonly " $data"?: ArtistWorksForSaleRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistWorksForSaleRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistWorksForSaleRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistArtworkFilter_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '14da54ddf5b4c09a742b453047dfefa2';
export default node;
