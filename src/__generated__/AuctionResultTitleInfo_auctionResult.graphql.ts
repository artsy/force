/**
 * @generated SignedSource<<881f597b8af3963b1d5ee24419c78338>>
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
    readonly href: string | null;
    readonly isPersonalArtist: boolean | null;
    readonly name: string | null;
    readonly slug: string;
  } | null;
  readonly dateText: string | null;
  readonly formattedSaleDate: string | null;
  readonly organization: string | null;
  readonly title: string | null;
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
