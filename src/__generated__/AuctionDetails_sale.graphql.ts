/**
 * @generated SignedSource<<333cdc27e8c5477b892ff8709a0d7525>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionDetails_sale$data = {
  readonly artworksConnection: {
    readonly totalCount: number | null;
  } | null;
  readonly cascadingEndTimeIntervalMinutes: number | null;
  readonly description: string | null;
  readonly endAt: string | null;
  readonly href: string | null;
  readonly internalID: string;
  readonly isClosed: boolean | null;
  readonly liveStartAt: string | null;
  readonly name: string | null;
  readonly slug: string;
  readonly startAt: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionInfoSidebar_sale" | "RegisterButton_sale" | "SaleDetailTimer_sale">;
  readonly " $fragmentType": "AuctionDetails_sale";
};
export type AuctionDetails_sale$key = {
  readonly " $data"?: AuctionDetails_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionDetails_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionDetails_sale",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RegisterButton_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionInfoSidebar_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaleDetailTimer_sale"
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
      "name": "liveStartAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
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
      "name": "cascadingEndTimeIntervalMinutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 0
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:0)"
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "1eb7662193f427d535085549a72de4f6";

export default node;
