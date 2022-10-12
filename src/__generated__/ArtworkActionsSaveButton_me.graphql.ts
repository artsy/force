/**
 * @generated SignedSource<<552d91419f853c92343d80ac1f8043fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActionsSaveButton_me$data = {
  readonly pendingIdentityVerification: {
    readonly internalID: string;
  } | null;
  readonly " $fragmentType": "ArtworkActionsSaveButton_me";
};
export type ArtworkActionsSaveButton_me$key = {
  readonly " $data"?: ArtworkActionsSaveButton_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkActionsSaveButton_me",
  "selections": [
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

(node as any).hash = "9e9b744fe1b6cc4d5b9ae2231bc7009d";

export default node;
