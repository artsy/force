/**
 * @generated SignedSource<<c5eb18dfa7e1120232506c2eefd7fa9d>>
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
    readonly qualifiedForBidding: boolean | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly isClosed: boolean | null | undefined;
  readonly isLiveOpen: boolean | null | undefined;
  readonly name: string | null | undefined;
  readonly requireIdentityVerification: boolean | null | undefined;
  readonly slug: string;
  readonly status: string | null | undefined;
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
