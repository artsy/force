/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_me = {
    readonly id: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = 'bb4c046846618b37d9771eb1fd62cdaa';
export default node;
