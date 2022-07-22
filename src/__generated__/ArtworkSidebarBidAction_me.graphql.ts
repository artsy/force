/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarBidAction_me = {
    readonly identityVerified: boolean | null;
    readonly pendingIdentityVerification: {
        readonly internalID: string;
    } | null;
    readonly " $refType": "ArtworkSidebarBidAction_me";
};
export type ArtworkSidebarBidAction_me$data = ArtworkSidebarBidAction_me;
export type ArtworkSidebarBidAction_me$key = {
    readonly " $data"?: ArtworkSidebarBidAction_me$data | undefined;
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "IdentityVerification",
      "kind": "LinkedField",
      "name": "pendingIdentityVerification",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '6511886a70399f8b6e19811fe3f7c8d1';
export default node;
