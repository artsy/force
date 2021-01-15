/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_me = {
    readonly " $fragmentRefs": FragmentRefs<"MyBids_me">;
    readonly " $refType": "AuctionsApp_me";
};
export type AuctionsApp_me$data = AuctionsApp_me;
export type AuctionsApp_me$key = {
    readonly " $data"?: AuctionsApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionsApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyBids_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '9e61697014a61b396b0516ad15cd6984';
export default node;
