/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarBidAction_me = {
    readonly identityVerified: boolean | null;
    readonly " $refType": "ArtworkSidebarBidAction_me";
};
export type ArtworkSidebarBidAction_me$data = ArtworkSidebarBidAction_me;
export type ArtworkSidebarBidAction_me$key = {
    readonly " $data"?: ArtworkSidebarBidAction_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarBidAction_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarBidAction_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "identityVerified",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = '557cde11858598ca541ab19f9bfc4ee2';
export default node;
