/**
 * @generated SignedSource<<8bab8f1cfac47dd680655015e44b3c27>>
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
  readonly formattedSaleDate: string | null;
  readonly location: string | null;
  readonly lotNumber: string | null;
  readonly mediumText: string | null;
  readonly organization: string | null;
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
      "alias": "formattedSaleDate",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM DD, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "saleDate",
      "storageKey": "saleDate(format:\"MMM DD, YYYY\")"
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

(node as any).hash = "02d2783f80fa38ab28aa9ecfead79e9e";

export default node;
