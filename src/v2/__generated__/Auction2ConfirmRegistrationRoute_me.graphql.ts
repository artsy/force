/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2ConfirmRegistrationRoute_me = {
    readonly internalID: string;
    readonly identityVerified: boolean | null;
    readonly hasQualifiedCreditCards: boolean | null;
    readonly " $refType": "Auction2ConfirmRegistrationRoute_me";
};
export type Auction2ConfirmRegistrationRoute_me$data = Auction2ConfirmRegistrationRoute_me;
export type Auction2ConfirmRegistrationRoute_me$key = {
    readonly " $data"?: Auction2ConfirmRegistrationRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2ConfirmRegistrationRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2ConfirmRegistrationRoute_me",
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
(node as any).hash = '2e0f2c304cf61c1a8b5b82a28e1c6b2d';
export default node;
