/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationApp_me = {
    readonly internalID: string;
    readonly identityVerification: {
        readonly internalID: string;
        readonly userID: string;
        readonly state: string;
    } | null;
    readonly " $refType": "IdentityVerificationApp_me";
};
export type IdentityVerificationApp_me$data = IdentityVerificationApp_me;
export type IdentityVerificationApp_me$key = {
    readonly " $data"?: IdentityVerificationApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationApp_me">;
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
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "id",
      "type": "String!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "IdentityVerificationApp_me",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
        }
      ],
      "concreteType": "IdentityVerification",
      "kind": "LinkedField",
      "name": "identityVerification",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "userID",
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
      "storageKey": null
    }
  ],
  "type": "Me"
};
})();
(node as any).hash = '820346679be7e29c2ffcf41999f0acf4';
export default node;
