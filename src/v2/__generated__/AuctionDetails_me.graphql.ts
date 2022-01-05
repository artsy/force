/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionDetails_me = {
    readonly " $fragmentRefs": FragmentRefs<"RegisterButton_me">;
    readonly " $refType": "AuctionDetails_me";
};
export type AuctionDetails_me$data = AuctionDetails_me;
export type AuctionDetails_me$key = {
    readonly " $data"?: AuctionDetails_me$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionDetails_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionDetails_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RegisterButton_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '99e7922d777e0d474ee72139b799bd9f';
export default node;
