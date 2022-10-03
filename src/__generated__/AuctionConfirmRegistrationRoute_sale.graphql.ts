/**
 * @generated SignedSource<<179d814cb9d46af9c49bb076cde97c42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionConfirmRegistrationRoute_sale$data = {
  readonly bidder: {
    readonly qualifiedForBidding: boolean | null;
  } | null;
  readonly internalID: string;
  readonly isClosed: boolean | null;
  readonly isLiveOpen: boolean | null;
  readonly name: string | null;
  readonly requireIdentityVerification: boolean | null;
  readonly slug: string;
  readonly status: string | null;
  readonly " $fragmentType": "AuctionConfirmRegistrationRoute_sale";
};
export type AuctionConfirmRegistrationRoute_sale$key = {
  readonly " $data"?: AuctionConfirmRegistrationRoute_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionConfirmRegistrationRoute_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionConfirmRegistrationRoute_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isClosed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isLiveOpen",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requireIdentityVerification",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Bidder",
      "kind": "LinkedField",
      "name": "bidder",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "qualifiedForBidding",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "9d07ded3a97b8f23838a0575086ab5de";

export default node;
