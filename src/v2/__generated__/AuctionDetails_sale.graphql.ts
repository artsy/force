/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionDetails_sale = {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly liveStartAt: string | null;
    readonly startAt: string | null;
    readonly endAt: string | null;
    readonly endedAt: string | null;
    readonly description: string | null;
    readonly href: string | null;
    readonly isClosed: boolean | null;
    readonly cascadingEndTimeInterval: number | null;
    readonly cascadingEndTime: {
        readonly intervalLabel: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"RegisterButton_sale" | "AuctionInfoSidebar_sale" | "SaleDetailTimer_sale">;
    readonly " $refType": "AuctionDetails_sale";
};
export type AuctionDetails_sale$data = AuctionDetails_sale;
export type AuctionDetails_sale$key = {
    readonly " $data"?: AuctionDetails_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionDetails_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionDetails_sale",
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
      "args": null,
      "kind": "ScalarField",
      "name": "endedAt",
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
      "name": "cascadingEndTimeInterval",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleCascadingEndTime",
      "kind": "LinkedField",
      "name": "cascadingEndTime",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "intervalLabel",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
(node as any).hash = 'e368b2849779d15308faa43d2294b5fd';
export default node;
