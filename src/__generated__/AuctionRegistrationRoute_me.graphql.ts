/**
 * @generated SignedSource<<e35e235214ed85d8e1d3b6f191bd336f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionRegistrationRoute_me$data = {
  readonly hasQualifiedCreditCards: boolean | null | undefined;
  readonly internalID: string;
  readonly isIdentityVerified: boolean | null | undefined;
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
      "name": "isIdentityVerified",
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

(node as any).hash = "112335fad3dcb69f182f89c34ac89b12";

export default node;
