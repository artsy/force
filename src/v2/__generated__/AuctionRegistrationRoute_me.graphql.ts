/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionRegistrationRoute_me = {
    readonly internalID: string;
    readonly identityVerified: boolean | null;
    readonly " $refType": "AuctionRegistrationRoute_me";
};
export type AuctionRegistrationRoute_me$data = AuctionRegistrationRoute_me;
export type AuctionRegistrationRoute_me$key = {
    readonly " $data"?: AuctionRegistrationRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionRegistrationRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionRegistrationRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "identityVerified",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '743e2c1e4789262ab1a7c5fa5ad34834';
export default node;
