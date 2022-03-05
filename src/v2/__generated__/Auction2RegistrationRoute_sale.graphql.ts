/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2RegistrationRoute_sale = {
    readonly slug: string;
    readonly name: string | null;
    readonly internalID: string;
    readonly status: string | null;
    readonly requireIdentityVerification: boolean | null;
    readonly isClosed: boolean | null;
    readonly isLiveOpen: boolean | null;
    readonly bidder: {
        readonly qualifiedForBidding: boolean | null;
    } | null;
    readonly " $refType": "Auction2RegistrationRoute_sale";
};
export type Auction2RegistrationRoute_sale$data = Auction2RegistrationRoute_sale;
export type Auction2RegistrationRoute_sale$key = {
    readonly " $data"?: Auction2RegistrationRoute_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2RegistrationRoute_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2RegistrationRoute_sale",
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
(node as any).hash = '20dab149473ec8d770ad1debc49c762d';
export default node;
