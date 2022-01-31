/**
 * @generated SignedSource<<0dba64c2b5d402e7e3ef204f1cd4e00f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionDetails_sale$data = {
  readonly name: string | null;
  readonly slug: string;
  readonly formattedStartDateTime: string | null;
  readonly liveStartAt: string | null;
  readonly startAt: string | null;
  readonly endAt: string | null;
  readonly description: string | null;
  readonly href: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"RegisterButton_sale" | "AuctionInfoSidebar_sale">;
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
      "name": "formattedStartDateTime",
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
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "07006232da1fc4595fbcff9aaf697ceb";

export default node;
