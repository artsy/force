/**
 * @generated SignedSource<<a3e1786382db618439857d329b9cf464>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteAccountRoute_me$data = {
  readonly hasPassword: boolean;
  readonly " $fragmentType": "DeleteAccountRoute_me";
};
export type DeleteAccountRoute_me$key = {
  readonly " $data"?: DeleteAccountRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteAccountRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteAccountRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPassword",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "681e2f7a259aacdf29b4588bada18aa4";

export default node;
