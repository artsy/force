/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Register_me = {
    readonly internalID: string;
    readonly identityVerified: boolean | null;
    readonly " $refType": "Register_me";
};
export type Register_me$data = Register_me;
export type Register_me$key = {
    readonly " $data"?: Register_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Register_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Register_me",
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
(node as any).hash = '42bbd95ecd77cb23df8a8249edf9897d';
export default node;
