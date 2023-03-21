/**
 * @generated SignedSource<<b5aa11dfcdf8cccc8e2f889787d7a1df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionResultMetaData_auctionResult$data = {
  readonly dimensionText: string | null;
  readonly location: string | null;
  readonly lotNumber: string | null;
  readonly mediumText: string | null;
  readonly organization: string | null;
  readonly saleDate: string | null;
  readonly saleTitle: string | null;
  readonly " $fragmentType": "AuctionResultMetaData_auctionResult";
};
export type AuctionResultMetaData_auctionResult$key = {
  readonly " $data"?: AuctionResultMetaData_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultMetaData_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionResultMetaData_auctionResult",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mediumText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dimensionText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "organization",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "location",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lotNumber",
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "f8541974beb0613bf2f6b7a20d39bce1";

export default node;
