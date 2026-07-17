/**
 * @generated SignedSource<<b9161a4c7055d74a925818c148bc1155>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HammerPriceLotDetails_auctionResult$data = {
  readonly artist: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly dateText: string | null | undefined;
  readonly dimensionText: string | null | undefined;
  readonly formattedSaleDate: string | null | undefined;
  readonly internalID: string;
  readonly location: string | null | undefined;
  readonly lotNumber: string | null | undefined;
  readonly mediumText: string | null | undefined;
  readonly organization: string | null | undefined;
  readonly saleTitle: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultImage_auctionResult">;
  readonly " $fragmentType": "HammerPriceLotDetails_auctionResult";
};
export type HammerPriceLotDetails_auctionResult$key = {
  readonly " $data"?: HammerPriceLotDetails_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceLotDetails_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HammerPriceLotDetails_auctionResult",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dateText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionResultImage_auctionResult"
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "c0b8ea6baab65addfbcf06ef4b52c697";

export default node;
