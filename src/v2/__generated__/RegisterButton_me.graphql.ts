/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RegisterButton_me = {
    readonly internalID: string;
    readonly identityVerified: boolean | null;
    readonly hasCreditCards: boolean | null;
    readonly pendingIdentityVerification: {
        readonly internalID: string;
    } | null;
    readonly " $refType": "RegisterButton_me";
};
export type RegisterButton_me$data = RegisterButton_me;
export type RegisterButton_me$key = {
    readonly " $data"?: RegisterButton_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RegisterButton_me">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegisterButton_me",
  "selections": [
    (v0/*: any*/),
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
      "name": "hasCreditCards",
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
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();
(node as any).hash = 'a92c693069d35859e07a2f479f5721cf';
export default node;
