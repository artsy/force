/**
 * @generated SignedSource<<580a78746b9cfba91270b218afa63658>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnsubscribeApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UnsubscribeLoggedIn_me">;
  readonly " $fragmentType": "UnsubscribeApp_me";
};
export type UnsubscribeApp_me$key = {
  readonly " $data"?: UnsubscribeApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnsubscribeApp_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnsubscribeApp_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnsubscribeLoggedIn_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "d629207be683825910dd735e47cb2e78";

export default node;
