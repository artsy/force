/**
 * @generated SignedSource<<49944632c58270e539b59d948e156e1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserCollectionRoute_user$data = {
  readonly id: string;
  readonly " $fragmentType": "UserCollectionRoute_user";
};
export type UserCollectionRoute_user$key = {
  readonly " $data"?: UserCollectionRoute_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserCollectionRoute_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserCollectionRoute_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "7398cbf1831af8bc1fa910039e84222c";

export default node;
