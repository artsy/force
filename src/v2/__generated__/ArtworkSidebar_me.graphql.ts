/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar_me = {
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarBidAction_me">;
    readonly " $refType": "ArtworkSidebar_me";
};
export type ArtworkSidebar_me$data = ArtworkSidebar_me;
export type ArtworkSidebar_me$key = {
    readonly " $data"?: ArtworkSidebar_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarBidAction_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'dae43a7cd24d3adbf9bb5ab1333ede35';
export default node;
