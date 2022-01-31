/**
 * @generated SignedSource<<7f4ea5e9c8db0fe85115d61ed1b5772d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationApp_me$data = {
  readonly internalID: string;
  readonly email: string | null;
  readonly identityVerification: {
    readonly internalID: string;
    readonly userID: string;
    readonly state: string;
  } | null;
  readonly " $fragmentType": "IdentityVerificationApp_me";
};
export type IdentityVerificationApp_me$key = {
  readonly " $data"?: IdentityVerificationApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"IdentityVerificationApp_me">;
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
      "name": "id"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "IdentityVerificationApp_me",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
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
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "abd8adb7376ce8126f079b2ebdfbe456";

export default node;
