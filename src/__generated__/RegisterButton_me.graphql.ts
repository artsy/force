/**
 * @generated SignedSource<<2d64dec1f0ed48c278f32c1ce2be4d78>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegisterButton_me$data = {
  readonly hasCreditCards: boolean | null | undefined;
  readonly internalID: string;
  readonly isIdentityVerified: boolean | null | undefined;
  readonly pendingIdentityVerification: {
    readonly internalID: string;
  } | null | undefined;
  readonly " $fragmentType": "RegisterButton_me";
};
export type RegisterButton_me$key = {
  readonly " $data"?: RegisterButton_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegisterButton_me">;
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
      "name": "isIdentityVerified",
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

(node as any).hash = "075560371bba40b08b83de2754097c5d";

export default node;
