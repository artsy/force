/**
 * @generated SignedSource<<98fdee944668e948aec517533e4067f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionRegistrationRoute_me$data = {
  readonly internalID: string;
  readonly identityVerified: boolean | null;
  readonly hasQualifiedCreditCards: boolean | null;
  readonly " $fragmentType": "AuctionRegistrationRoute_me";
};
export type AuctionRegistrationRoute_me$key = {
  readonly " $data"?: AuctionRegistrationRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionRegistrationRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionRegistrationRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
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
      "name": "hasQualifiedCreditCards",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "b06ca5bee581b2dc45e4b0da0ecf12e9";

export default node;
