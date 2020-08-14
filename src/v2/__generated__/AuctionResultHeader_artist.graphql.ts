/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionResultHeader_artist = {
    readonly slug: string;
    readonly " $refType": "AuctionResultHeader_artist";
};
export type AuctionResultHeader_artist$data = AuctionResultHeader_artist;
export type AuctionResultHeader_artist$key = {
    readonly " $data"?: AuctionResultHeader_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionResultHeader_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionResultHeader_artist",
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
(node as any).hash = 'f667052f3e1b95eb9b9c71a7cfff9078';
export default node;
