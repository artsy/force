/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationApp_identityVerification = {
    readonly internalID: string;
    readonly state: string;
    readonly " $refType": "IdentityVerificationApp_identityVerification";
};
export type IdentityVerificationApp_identityVerification$data = IdentityVerificationApp_identityVerification;
export type IdentityVerificationApp_identityVerification$key = {
    readonly " $data"?: IdentityVerificationApp_identityVerification$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationApp_identityVerification">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IdentityVerificationApp_identityVerification",
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
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "IdentityVerification",
  "abstractKey": null
};
(node as any).hash = '2f42fce8d99c04ba8268fcaff52184a1';
export default node;
