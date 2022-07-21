/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkApp_me = {
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar_me" | "SubmittedOrderModal_me">;
    readonly " $refType": "ArtworkApp_me";
};
export type ArtworkApp_me$data = ArtworkApp_me;
export type ArtworkApp_me$key = {
    readonly " $data"?: ArtworkApp_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmittedOrderModal_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '6c6dcef9461649e857fcb002fc7f937a';
export default node;
