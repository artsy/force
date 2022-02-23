/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2RegistrationRoute_me = {
    readonly internalID: string;
    readonly identityVerified: boolean | null;
    readonly " $refType": "Auction2RegistrationRoute_me";
};
export type Auction2RegistrationRoute_me$data = Auction2RegistrationRoute_me;
export type Auction2RegistrationRoute_me$key = {
    readonly " $data"?: Auction2RegistrationRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2RegistrationRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2RegistrationRoute_me",
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
(node as any).hash = 'b0cf703298d96c65d69db6f9f1e8bd3a';
export default node;
