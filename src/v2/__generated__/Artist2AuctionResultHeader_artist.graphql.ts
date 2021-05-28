/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2AuctionResultHeader_artist = {
    readonly slug: string;
    readonly " $refType": "Artist2AuctionResultHeader_artist";
};
export type Artist2AuctionResultHeader_artist$data = Artist2AuctionResultHeader_artist;
export type Artist2AuctionResultHeader_artist$key = {
    readonly " $data"?: Artist2AuctionResultHeader_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2AuctionResultHeader_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2AuctionResultHeader_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '4e754424a48543e460c500dfa0e692f7';
export default node;
