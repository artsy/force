/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RegisterButton_me = {
    readonly identityVerified: boolean | null;
    readonly pendingIdentityVerification: {
        readonly internalID: string;
    } | null;
    readonly " $refType": "RegisterButton_me";
};
export type RegisterButton_me$data = RegisterButton_me;
export type RegisterButton_me$key = {
    readonly " $data"?: RegisterButton_me$data;
    readonly " $fragmentRefs": FragmentRefs<"RegisterButton_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegisterButton_me",
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
(node as any).hash = 'e6b306b558eb5b4ffaf3eba4412c795f';
export default node;
