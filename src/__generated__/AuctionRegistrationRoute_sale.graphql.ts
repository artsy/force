/**
 * @generated SignedSource<<0f3a80d630a04c51cf9ecb7d7de0cb72>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionRegistrationRoute_sale$data = {
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
  readonly " $fragmentType": "AuctionRegistrationRoute_sale";
};
export type AuctionRegistrationRoute_sale$key = {
  readonly " $data"?: AuctionRegistrationRoute_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionRegistrationRoute_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionRegistrationRoute_sale",
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
      "name": "requireIdentityVerification",
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

(node as any).hash = "4b6760df4a32b0e3781d5a66eb3a9ba2";

export default node;
