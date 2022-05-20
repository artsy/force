/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DeleteAccountRoute_me = {
    readonly hasPassword: boolean;
    readonly " $refType": "DeleteAccountRoute_me";
};
export type DeleteAccountRoute_me$data = DeleteAccountRoute_me;
export type DeleteAccountRoute_me$key = {
    readonly " $data"?: DeleteAccountRoute_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"DeleteAccountRoute_me">;
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
(node as any).hash = '681e2f7a259aacdf29b4588bada18aa4';
export default node;
