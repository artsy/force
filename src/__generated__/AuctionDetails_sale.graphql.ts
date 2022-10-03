/**
 * @generated SignedSource<<11bd5b778234531f72fd8af2c8e0e962>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionDetails_sale$data = {
  readonly internalID: string;
  readonly name: string | null;
  readonly slug: string;
  readonly liveStartAt: string | null;
  readonly startAt: string | null;
  readonly endAt: string | null;
  readonly description: string | null;
  readonly href: string | null;
  readonly isClosed: boolean | null;
  readonly cascadingEndTimeIntervalMinutes: number | null;
  readonly " $fragmentSpreads": FragmentRefs<"RegisterButton_sale" | "AuctionInfoSidebar_sale" | "SaleDetailTimer_sale">;
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
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "cfcbdbc49d04d07475a7e3a52262bb03";

export default node;
