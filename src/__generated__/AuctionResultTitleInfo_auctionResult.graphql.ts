/**
 * @generated SignedSource<<613c01cf7693f1a72d276737bfa282ca>>
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

(node as any).hash = "2f6b39ec17a67b203623a18bbb6ab22e";

export default node;
