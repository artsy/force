/**
 * @generated SignedSource<<eed1e8399e7257db4e1d309b7086a396>>
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
  readonly organization: string | null;
  readonly saleDate: string | null;
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

(node as any).hash = "21944d1eebb28bb16a59077aa70e60b6";

export default node;
