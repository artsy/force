/**
 * @generated SignedSource<<36d62a195b7cc64d96fff53e449e89e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionResultTitleInfo_auctionResult$data = {
  readonly artist: {
    readonly href: string | null | undefined;
    readonly isPersonalArtist: boolean | null | undefined;
    readonly name: string | null | undefined;
    readonly slug: string;
  } | null | undefined;
  readonly dateText: string | null | undefined;
  readonly formattedSaleDate: string | null | undefined;
  readonly organization: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "AuctionResultTitleInfo_auctionResult";
};
export type AuctionResultTitleInfo_auctionResult$key = {
  readonly " $data"?: AuctionResultTitleInfo_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultTitleInfo_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionResultTitleInfo_auctionResult",
  "selections": [
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
          "name": "isPersonalArtist",
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
          "name": "slug",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
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
      "kind": "ScalarField",
      "name": "organization",
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "e963110c0351ccfb2623c7997ffe32d5";

export default node;
