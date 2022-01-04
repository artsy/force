/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnsubscribeApp_me = {
    readonly " $fragmentRefs": FragmentRefs<"UnsubscribeLoggedIn_me">;
    readonly " $refType": "UnsubscribeApp_me";
};
export type UnsubscribeApp_me$data = UnsubscribeApp_me;
export type UnsubscribeApp_me$key = {
    readonly " $data"?: UnsubscribeApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"UnsubscribeApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnsubscribeApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnsubscribeLoggedIn_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'd629207be683825910dd735e47cb2e78';
export default node;
