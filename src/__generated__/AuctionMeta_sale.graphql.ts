/**
 * @generated SignedSource<<536f63e8860047da45b03aee6b8a5694>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionMeta_sale$data = {
  readonly name: string | null;
  readonly description: string | null;
  readonly slug: string;
  readonly " $fragmentType": "AuctionMeta_sale";
};
export type AuctionMeta_sale$key = {
  readonly " $data"?: AuctionMeta_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionMeta_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionMeta_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "b9dd3b2b515e4f8724cf1940da45a6bf";

export default node;
