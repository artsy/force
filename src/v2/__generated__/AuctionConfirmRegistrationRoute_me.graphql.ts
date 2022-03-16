/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionConfirmRegistrationRoute_me = {
    readonly internalID: string;
    readonly identityVerified: boolean | null;
    readonly hasQualifiedCreditCards: boolean | null;
    readonly " $refType": "AuctionConfirmRegistrationRoute_me";
};
export type AuctionConfirmRegistrationRoute_me$data = AuctionConfirmRegistrationRoute_me;
export type AuctionConfirmRegistrationRoute_me$key = {
    readonly " $data"?: AuctionConfirmRegistrationRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionConfirmRegistrationRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionConfirmRegistrationRoute_me",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasQualifiedCreditCards",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'ce3ca60286eef2a4636740d5b20d021b';
export default node;
