/**
 * @generated SignedSource<<17730447b7973c34ed08e53538b08369>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionDetails_sale$data = {
  readonly cascadingEndTimeIntervalMinutes: number | null | undefined;
  readonly description: string | null | undefined;
  readonly endAt: string | null | undefined;
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly isClosed: boolean | null | undefined;
  readonly liveStartAt: string | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly startAt: string | null | undefined;
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
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "cfcbdbc49d04d07475a7e3a52262bb03";

export default node;
