/* tslint:disable */

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
  "kind": "Fragment",
  "name": "AuctionResultHeader_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'f667052f3e1b95eb9b9c71a7cfff9078';
export default node;
