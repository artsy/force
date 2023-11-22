/**
 * @generated SignedSource<<93ac1fc6f013307367cc4fbe5e292368>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionResultMetaData_auctionResult$data = {
  readonly dimensionText: string | null | undefined;
  readonly estimate: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly formattedSaleDate: string | null | undefined;
  readonly isUpcoming: boolean | null | undefined;
  readonly location: string | null | undefined;
  readonly lotNumber: string | null | undefined;
  readonly mediumText: string | null | undefined;
  readonly organization: string | null | undefined;
  readonly saleTitle: string | null | undefined;
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionLotEstimate",
      "kind": "LinkedField",
      "name": "estimate",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUpcoming",
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "88fd0ce96e0b12e3a59083602eb6c6a2";

export default node;
